#!/usr/bin/env python3
"""Clean + smooth the part masks so they hug the parts in the photo.

Reads  assets/masks_original/*.png   (never modified)
Writes assets/masks/*.png            (same size, same yellow #ffd94f, antialiased alpha)

Steps per mask:
 1. binarise alpha
 2. drop specks (tiny disconnected blobs) and fill pin-holes
 3. snap the edge to the real photo edge with GrabCut, only inside a narrow band
    around the old edge (so it can never wander far from the hand-made mask)
 4. smooth the outline: 4x upscale -> gaussian -> threshold -> morphological open/close
 5. downscale with area averaging = clean antialiased edge
"""
import cv2, glob, os, sys
import numpy as np
from scipy import ndimage as ndi

SRC, DST = 'assets/masks_original', 'assets/masks'
PHOTO = 'assets/base/wheel.jpg'          # default photo (wheel scene)
CABIN_PHOTO = 'assets/base/cabin.jpg'    # masks named cabin-*.png are snapped against this photo
CONSOLE_PHOTO = 'assets/base/console.jpg'  # masks named console-*.png are snapped against this photo
SHIFTER_PHOTO = 'assets/base/shifter.jpg'  # masks named shifter-*.png are snapped against this photo
YELLOW = (255, 217, 79)
UP = 4

def drop_specks(b):
    lab, n = ndi.label(b)
    if n <= 1: return b
    sizes = ndi.sum(b, lab, range(1, n + 1))
    keep = sizes >= max(60, 0.04 * sizes.max())      # <4% of the main body = speck
    return np.isin(lab, np.where(keep)[0] + 1)

def fill_pinholes(b, max_area=80):
    holes, n = ndi.label(~b)
    sizes = ndi.sum(~b, holes, range(1, n + 1))
    for i, sz in enumerate(sizes, 1):
        if sz <= max_area: b[holes == i] = True      # real gaps (wheel spokes) are bigger, so they stay
    return b

def grabcut_snap(b, photo, band):
    k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * band + 1, 2 * band + 1))
    sure_fg = cv2.erode(b.astype(np.uint8), k).astype(bool)
    maybe = cv2.dilate(b.astype(np.uint8), k).astype(bool)
    gc = np.full(b.shape, cv2.GC_BGD, np.uint8)
    gc[maybe] = cv2.GC_PR_BGD
    gc[b] = cv2.GC_PR_FGD
    gc[sure_fg] = cv2.GC_FGD
    if sure_fg.sum() < 30 or (b.sum() - sure_fg.sum()) < 30:
        return b                                      # too small for GrabCut, keep as is
    bg, fg = np.zeros((1, 65)), np.zeros((1, 65))
    try:
        cv2.grabCut(photo, gc, None, bg, fg, 4, cv2.GC_INIT_WITH_MASK)
    except cv2.error:
        return b
    out = (gc == cv2.GC_FGD) | (gc == cv2.GC_PR_FGD)
    # safety: never lose or gain more than ~25% area vs the original
    if abs(int(out.sum()) - int(b.sum())) > 0.25 * b.sum(): return b
    return out

def smooth(b, sigma):
    big = cv2.resize(b.astype(np.float32), None, fx=UP, fy=UP, interpolation=cv2.INTER_CUBIC)
    big = cv2.GaussianBlur(big, (0, 0), sigma * UP)
    big = big > 0.5
    r = max(1, int(UP * 1.2))
    k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * r + 1, 2 * r + 1))
    big = cv2.morphologyEx(big.astype(np.uint8), cv2.MORPH_OPEN, k)
    big = cv2.morphologyEx(big, cv2.MORPH_CLOSE, k)
    return big.astype(np.float32)

def process(path, photo):
    rgba = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    h, w = rgba.shape[:2]
    b = rgba[..., 3] > 128
    b = fill_pinholes(drop_specks(b))
    area = b.sum()
    sigma = float(np.clip(np.sqrt(area) / 60, 0.8, 2.2))   # small parts get gentler smoothing
    band = int(np.clip(np.sqrt(area) / 25, 2, 5))
    b = grabcut_snap(b, photo, band)
    b = fill_pinholes(drop_specks(b))
    big = smooth(b, sigma)
    a = cv2.resize(big, (w, h), interpolation=cv2.INTER_AREA)   # antialiased 0..1
    out = np.zeros((h, w, 4), np.uint8)
    out[..., 0], out[..., 1], out[..., 2] = YELLOW[2], YELLOW[1], YELLOW[0]   # BGR
    out[..., 3] = np.round(a * 255).astype(np.uint8)
    return out

if __name__ == '__main__':
    os.makedirs(DST, exist_ok=True)
    photos = {p: cv2.imread(p) for p in (PHOTO, CABIN_PHOTO, CONSOLE_PHOTO, SHIFTER_PHOTO)}
    only = set(sys.argv[1:])                       # optional: python3 tools/smooth_masks.py cabin-armrest ...
    for f in sorted(glob.glob(f'{SRC}/*.png')):
        stem = os.path.basename(f)[:-4]
        if only and stem not in only: continue
        photo = photos[CABIN_PHOTO if stem.startswith('cabin-') else CONSOLE_PHOTO if stem.startswith('console-') else SHIFTER_PHOTO if stem.startswith('shifter-') else PHOTO]
        out = process(f, photo)
        cv2.imwrite(os.path.join(DST, os.path.basename(f)), out)
        print('ok', os.path.basename(f))
