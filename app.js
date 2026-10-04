/*
  KIA SOUL 2015 — photographic flashcard app
  Language: Mexican Spanish UI, English component names.
  Photos: assets/base/   Masks: assets/masks/   Sounds: assets/sounds/

  Sections: 1 data · 2 hit-testing · 3 viewer · 4 sounds · 5 popups · 6 reseña · 7 examen · 8 mistakes · 9 wiring
*/

/* ================= 1. DATA ================= */

const SCENES = {
  wheel:   {image:'assets/base/wheel.jpg',   w:800,  h:600,  title:'Steering Wheel Area'},
  console: {image:'assets/base/console.jpg', w:800,  h:600,  title:'Center Stack'},
  shifter: {image:'assets/base/shifter.jpg', w:800,  h:600,  title:'Gear Shifter Console'},
  cabin:   {image:'assets/base/cabin.jpg',   w:800,  h:600,  title:'Full Cabin'},
  dash:    {image:'assets/base/dash.jpg',    w:1600, h:1200, title:'Driver Dashboard'},
  side:    {image:'assets/base/side.jpg',    w:1600, h:1200, title:'Cabin Wide View'},
};

// Explanations that show up on more than one photo live here once.
const TXT = {
  steering: 'Te ayuda a dirigir el carro hacia la izquierda o la derecha.',
  seat:     'Es donde te sientas para manejar. Se puede ajustar para que estés cómodo y alcances los controles.',
  gear:     'Sirve para cambiar la posición de la transmisión: estacionar, reversa, neutral o manejar.',
  hazard:   'Activa las luces intermitentes para avisar de una situación de emergencia.',
  airbag:   'Franja con una luz que avisa si la bolsa de aire del pasajero está activada o desactivada.',
  wiper:    'Controla los limpiaparabrisas y ayuda a limpiar el parabrisas.',
};

/*
  One entry per part.  box = [left%, right%, top%, bottom%] over its photo.
  mask = file name (no folder, no .png) inside assets/masks/.  Parts without a mask
  fall back to a yellow box until you add one.
*/
const RAW_CARDS = [
  // --- wheel ---
  {id:1,  scene:'wheel', mask:'steering-wheel',        name:'Steering Wheel',                   explanation:TXT.steering, box:[28.25,64.38,7.5,56.67]},
  {id:2,  scene:'wheel', mask:'fuse-panel-cover',      name:'Fuse Panel Cover',                 explanation:'Cubre los fusibles que protegen los circuitos eléctricos del carro.', box:[4.88,20.38,60.0,78.5]},
  {id:3,  scene:'wheel', mask:'brake-pedal',           name:'Brake Pedal',                      explanation:'Al presionarlo, el carro disminuye la velocidad o se detiene.', box:[22.0,29.12,82.17,99.83]},
  {id:4,  scene:'wheel', mask:'dimmer-esc-switches',   name:'Dimmer / ESC Off Switches',        explanation:'Ajustan el brillo del tablero o desactivan el control de estabilidad.', box:[13.38,19.5,48.33,55.33]},
  {id:5,  scene:'wheel', mask:'accelerator-pedal',     name:'Accelerator Pedal',                explanation:'Al presionarlo, el motor aumenta la fuerza para avanzar más rápido.', box:[13.25,21.88,87.67,97.33]},
  {id:34, scene:'wheel', mask:'light-turn-signal-stalk', name:'Light & Turn Signal Stalk',      explanation:'Sirve para prender las luces y para avisar con las direccionales cuando vas a dar vuelta.', box:[26.75,33.88,29.33,41.0]},
  {id:35, scene:'wheel', mask:'gear-shift-lever',      name:'Gear Shift Lever',                 explanation:TXT.gear,     box:[62.12,77.0,51.33,71.5]},
  {id:36, scene:'wheel', mask:'passenger-side-mirror', name:'Passenger Side Mirror',            explanation:'Te deja ver lo que viene al lado y atrás del carro, del lado del pasajero.', box:[80.5,92.62,9.67,20.33]},
  {id:37, scene:'wheel', mask:'driver-seat',           name:'Driver Seat',                      explanation:TXT.seat,     box:[40.38,100.0,19.67,100.0]},
  {id:38, scene:'wheel', mask:'airbag-horn-pad',       name:'Airbag Module & Horn Pad',         explanation:'Al presionarlo suena el claxon. Además, guarda la bolsa de aire que te protege en un choque.', box:[39.38,55.38,25.83,45.83]},
  {id:39, scene:'wheel', mask:'tilt-telescopic-lever', name:'Tilt & Telescopic Steering Lever', explanation:'Al soltarla puedes subir, bajar o acercar el volante para manejar más cómodo.', box:[28.12,37.38,50.17,54.5]},
  {id:40, scene:'wheel', mask:'interior-door-handle',  name:'Interior Passenger Door Handle',   explanation:'Se jala para abrir la puerta del pasajero desde adentro.', box:[89.25,98.75,32.33,39.5]},

  // --- cabin ---
  {id:19, scene:'cabin', mask:'cabin-parking-brake',   name:'Parking Brake Handle',             explanation:'Mantiene el carro detenido cuando está estacionado.', box:[22.88,39.25,70.5,89.67]},
  {id:20, scene:'cabin',                                name:'Audio Volume Knob',                explanation:'Gira para subir o bajar el volumen del sistema de audio.', box:[53.88,67.0,35.17,43.0]},
  {id:21, scene:'cabin', mask:'cabin-ignition',        name:'Ignition Key Cylinder',            explanation:'Aquí se inserta la llave para encender el motor.', box:[39.62,44.12,31.33,36.5]},
  {id:22, scene:'cabin', mask:'cabin-cupholders',      name:'Center Console & Cup Holders',     explanation:'Espacio de almacenamiento y sostiene vasos o botellas.', box:[24.5,46.62,82.33,99.83]},
  {id:41, scene:'cabin', mask:'cabin-hazard-button',   name:'Hazard Warning Button',            explanation:TXT.hazard,   box:[65.12,69.25,7.33,13.0]},
  {id:42, scene:'cabin', mask:'cabin-armrest',         name:'Armrest',                          explanation:'Te da un lugar cómodo para apoyar el brazo mientras manejas.', box:[0.0,22.62,70.5,100.0]},
  {id:43, scene:'cabin', mask:'cabin-center-dashboard-module', name:'Center Dashboard Module',  explanation:'Panel central del tablero donde están la pantalla, el radio y los controles del clima.', box:[50.75,80.25,14.33,49.83]},
  {id:44, scene:'cabin', mask:'cabin-driver-seat',     name:'Driver Seat',                      explanation:TXT.seat,     box:[0.0,39.5,51.67,84.33]},
  {id:45, scene:'cabin', mask:'cabin-gear-stick',      name:'Gear Stick',                       explanation:TXT.gear,     box:[44.0,57.62,50.0,74.67]},
  {id:46, scene:'cabin', mask:'cabin-master-door-switch-panel', name:'Master Door Switch Panel', explanation:'Desde aquí el conductor controla las ventanas y los seguros de las puertas.', box:[5.75,19.25,33.83,37.67]},
  {id:47, scene:'cabin', mask:'cabin-passenger-indicator', name:'Passenger Indicator',          explanation:'Luz que avisa el estado de la bolsa de aire del pasajero.', box:[53.88,65.88,41.17,47.67]},
  {id:48, scene:'cabin', mask:'cabin-steering-wheel',  name:'Steering Wheel',                   explanation:TXT.steering, box:[19.0,42.38,1.17,40.33]},
  {id:49, scene:'cabin', mask:'cabin-wiper-stalk',     name:'Wiper Stalk',                      explanation:TXT.wiper,    box:[41.0,47.25,19.83,29.17]},

  // --- console (Center Stack) ---
  {id:6, scene:'console', mask:'console-mode-button', name:'Mode Button', explanation:'Elige hacia dónde sale el aire: a la cara, a los pies, al parabrisas o combinaciones.', box:[62.25,68.12,52,58.5]},
  {id:7, scene:'console', mask:'console-defog-defrost-controls', name:'Defog / Defrost Controls', explanation:'Desempañan los vidrios: el botón de enfrente manda aire al parabrisas y el de atrás calienta el vidrio trasero para quitar la humedad o el hielo.', box:[36,46.25,53.33,71.17]},
  {id:8, scene:'console', mask:'console-tune-knob', name:'Tune Knob', explanation:'Gira para buscar estaciones o moverte por los menús del radio, y al presionarla seleccionas.', box:[69.5,73.88,36,42.67]},
  {id:9, scene:'console', mask:'console-recirculation-button', name:'Recirculation Button', explanation:'Hace que el aire circule dentro del carro en lugar de meter aire de afuera. Sirve para enfriar más rápido o evitar polvo y olores.', box:[58.38,63,59.5,66.5]},
  {id:10, scene:'console', mask:'console-fan-speed-buttons', name:'Fan Speed Buttons', explanation:'Suben o bajan la fuerza del ventilador, o sea, qué tan fuerte sale el aire.', box:[24.5,36.75,54.17,72.17]},
  {id:12, scene:'console', mask:'console-climate-control-dial', name:'Climate Control Dial', explanation:'Gira para subir o bajar la temperatura. En AUTO el carro ajusta el aire solo y en OFF se apaga el clima.', box:[44.62,59.38,50.33,72]},
  {id:13, scene:'console', mask:'console-climate-button', name:'Climate Button', explanation:'Muestra en la pantalla la información y los ajustes del clima.', box:[62.88,68.12,58.17,65.33]},
  {id:14, scene:'console', mask:'console-ac-button', name:'A/C Button', explanation:'Enciende o apaga el aire acondicionado para enfriar y quitar la humedad del aire.', box:[56,62.88,52,59]},
  {id:15, scene:'console', mask:'console-infotainment-display', name:'Infotainment Display', explanation:'Pantalla central donde ves el radio, la hora, el teléfono y las opciones de conexión del carro.', box:[24.88,62.88,2.33,40.67]},
  {id:50, scene:'console', mask:'console-volume-knob', name:'Volume Knob', explanation:'Gira para subir o bajar el volumen y al presionarla enciende o apaga el audio.', box:[9.12,18.75,30.5,42.5]},
  {id:51, scene:'console', mask:'console-audio-panel', name:'Audio Panel', explanation:'Botones para cambiar la fuente de audio y saltar de estación o de canción.', box:[1,16.75,0,26.67]},
  {id:52, scene:'console', mask:'console-setup-panel', name:'Setup Panel', explanation:'Botones de acceso rápido a las apps, el teléfono y los ajustes del sistema de audio.', box:[65.88,73.62,14.5,34.5]},
  {id:53, scene:'console', mask:'console-passenger-airbag-indicator-panel', name:'Passenger Airbag Indicator Panel', explanation:TXT.airbag, box:[27.5,67.38,70,87.17]},

  // --- shifter (Gear Shifter Console) ---
  {id:16, scene:'shifter', mask:'shifter-gear-position-display', name:'Gear Position Display', explanation:'Muestra en qué posición está la palanca: P (estacionar), R (reversa), N (neutral) o D (manejar).', box:[36.75,56,53.17,79.17]},
  {id:17, scene:'shifter', mask:'shifter-charger-port', name:'Charger Port Panel', explanation:'Aquí conectas el cargador del celular u otros accesorios, en la toma de 12 voltios o en el puerto para cargar.', box:[15.25,36.38,22.5,39]},
  {id:18, scene:'shifter', mask:'shifter-shift-lever', name:'Shift Lever', explanation:TXT.gear, box:[38.38,66.38,16,78.67]},
  {id:54, scene:'shifter', mask:'shifter-passenger-airbag-indicator-panel', name:'Passenger Airbag Indicator Panel', explanation:TXT.airbag, box:[7.75,44.38,0,12.67]},
  {id:55, scene:'shifter', mask:'shifter-door-speaker', name:'Door Speaker', explanation:'Bocina integrada en la puerta que reproduce el sonido del sistema de audio.', box:[70,82.88,6.83,27.67]},
  {id:56, scene:'shifter', mask:'shifter-shift-boot', name:'Shift Boot', explanation:'Es la funda que cubre la base de la palanca y evita que entre polvo o suciedad al mecanismo.', box:[38.38,66.38,38.67,78.67]},
  {id:57, scene:'shifter', mask:'shifter-shifter-base', name:'Shifter Base', explanation:'Es el marco que rodea la palanca y la sostiene en su lugar en la consola central.', box:[33.12,70.25,37.33,83.67]},
  {id:58, scene:'shifter', mask:'shifter-passenger-seat', name:'Passenger Seat', explanation:'Es el asiento donde viaja el copiloto. Se puede ajustar para ir más cómodo.', box:[81.62,100,26.17,86.5]},

  // --- not in the game yet (no masks) ---
  {id:24, scene:'dash',    name:'Cruise Control Buttons',               explanation:'Si está equipado, ayuda a mantener una velocidad seleccionada sin usar el acelerador.', box:[52.94,59.69,59.0,67.58]},
  {id:25, scene:'dash',    name:'Hazard Warning Button',                explanation:TXT.hazard, box:[73.88,77.0,32.33,37.5]},
  {id:26, scene:'dash',    name:'Infotainment System',                  explanation:'Sistema central de audio, teléfono y navegación del carro.', box:[68.94,83.38,44.58,55.67]},
  {id:27, scene:'dash',    name:'Instrument Cluster',                   explanation:'Aquí ves información como velocidad, combustible y luces de advertencia.', box:[33.0,49.69,37.33,52.75]},
  {id:28, scene:'dash',    name:'Steering Wheel Audio Controls',        explanation:'Permiten controlar algunas funciones de audio desde el volante.', box:[18.06,28.56,68.08,77.5]},
  {id:29, scene:'dash',    name:'Turn Signal Stalk',                    explanation:'Indica a los demás que vas a dar vuelta o cambiar de carril.', box:[19.25,32.94,56.75,60.42]},
  {id:30, scene:'dash',    name:'Driver Airbag Module',                 explanation:'Protege al conductor en ciertas colisiones.', box:[22.38,53.5,54.92,98.67]},
  {id:31, scene:'dash',    name:'Wiper / Washer Stalk',                 explanation:TXT.wiper, box:[54.56,61.56,53.0,56.83]},
  {id:32, scene:'side',    name:'Passenger Door Handle',                explanation:'Permite abrir la puerta del pasajero desde adentro.', box:[76.75,84.75,18.83,24.83]},
  {id:33, scene:'side',    name:'Dashboard Speaker',                    explanation:'Bocina integrada en el tablero para el sistema de audio.', box:[21.81,40.38,11.5,16.33]},
];
const ALL_CARDS = RAW_CARDS.map(c => c.mask ? {...c, mask:`assets/masks/${c.mask}.png`} : c);

// Photos in the game, in the order Reseña walks through them. Add 'dash', 'side' later.
const ACTIVE_SCENES = ['wheel', 'cabin', 'console', 'shifter'];
const CARDS = ALL_CARDS.filter(c => ACTIVE_SCENES.includes(c.scene));
const cardsForScene = scene => CARDS.filter(c => c.scene === scene);

// Examen: every photo gets a random number of "find the part" cards between these two.
const EXAM_MIN_PER_PHOTO = 1;
const EXAM_MAX_PER_PHOTO = 4;
const MAX_HEARTS = 3;

// Look-around world. The sharp photo (and its masks) never changes size; a blurred extension of the
// photo is added around it so you can look past its edges.
const PAN_MARGIN = 0.02;   // how far past the photo's edge you can drag when the photo fills the screen (fraction of the photo)
const WORLD_PAD  = 0.6;    // blurred extension on EACH side (fraction of the photo). Needs to be big enough for the furthest zoom-out.
let zoomOut = (() => { try { return Math.min(1, Math.max(0, parseFloat(localStorage.getItem('kiaZoomOut')) || 0)); } catch(e){ return 0; } })();   // 0 = photo fills the screen · 1 = zoomed out as far as it goes (menu slider)
const PHOTO_ZOOM = {h:1.18, w:1.1};   // how big the photo is on screen: photo height = 1.18 × screen height (or width = 1.3 × screen width, whichever is bigger). Lower = see more at once
const EDGE_FEATHER = 2.5; // % of the photo's edge that fades into the blurred extension (0 = hard edge)

/* ================= 2. HIT-TESTING ================= */
// One invisible layer over the photo. A tap picks the part whose mask (or box, for parts without a
// mask yet) is under the finger, or the nearest one within FINGER_PX of it, so small parts stay easy to hit.

const FINGER_PX = 22;
const maskData = {};   // url -> {w,h,a:Uint8Array,area}  (null if unreadable)

function loadMask(url){
  if(url in maskData) return;
  maskData[url] = null;
  const img = new Image();
  img.onload = () => { try{
    const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
    const x = c.getContext('2d', {willReadFrequently:true}); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height).data, a = new Uint8Array(c.width * c.height);
    let area = 0;
    for(let i = 0; i < a.length; i++){ a[i] = d[i*4+3]; if(a[i] > 128) area++; }
    maskData[url] = {w:c.width, h:c.height, a, area};
  }catch(e){ maskData[url] = null; } };
  img.src = url;
}
CARDS.forEach(c => { if(c.mask) loadMask(c.mask); });

// distance (in image px) from a point to the part, plus the part's area for tie-breaks
function distToCard(c, s, x, y, r){
  const m = c.mask && maskData[c.mask];
  if(m){
    let best = Infinity;
    const R = Math.ceil(r), x0 = Math.max(0, Math.floor(x)-R), x1 = Math.min(m.w-1, Math.floor(x)+R),
          y0 = Math.max(0, Math.floor(y)-R), y1 = Math.min(m.h-1, Math.floor(y)+R);
    for(let yy = y0; yy <= y1; yy++) for(let xx = x0; xx <= x1; xx++){
      if(m.a[yy*m.w+xx] > 128){ const d = Math.hypot(xx-x, yy-y); if(d < best) best = d; }
    }
    return {d:best, area:m.area};
  }
  const l = c.box[0]/100*s.w, rr = c.box[1]/100*s.w, t = c.box[2]/100*s.h, b = c.box[3]/100*s.h;
  return {d:Math.hypot(Math.max(l-x, 0, x-rr), Math.max(t-y, 0, y-b)), area:(rr-l)*(b-t)};
}

function hitTest(scene, nx, ny, cssWidth, preferId){
  const s = SCENES[scene], x = nx*s.w, y = ny*s.h, r = FINGER_PX/(cssWidth/s.w);
  const near = [];
  cardsForScene(scene).forEach(c => { const h = distToCard(c, s, x, y, r); if(h.d <= r) near.push({card:c, d:h.d, area:h.area}); });
  if(!near.length) return null;
  const pref = near.find(n => n.card.id === preferId && n.d <= 0.5);
  if(pref) return pref.card;
  const inside = near.filter(n => n.d <= 0.5).sort((a, b) => a.area - b.area)[0];
  // inside a big part (e.g. the seat) but a much smaller part is within finger reach: take the small one
  const small = near.filter(n => n !== inside && (!inside || n.area < inside.area/6)).sort((a, b) => a.d - b.d)[0];
  if(inside) return (small || inside).card;
  // nothing under the finger: nearest wins, but big parts (seat) count as farther than small ones
  const eff = n => n.d * (1 + n.area/10000);
  return near.sort((a, b) => eff(a) - eff(b))[0].card;
}

/* ================= 3. LOOK-AROUND VIEWER ================= */

const areaOf = c => (c.box[1]-c.box[0]) * (c.box[3]-c.box[2]);

// The yellow highlight for a card (png mask, or a plain box when the part has no mask yet).
function highlightLayer(p, on){
  const cls = on ? ' on' : '';
  if(p.mask) return `<img class="hl-img${cls}" data-id="${p.id}" src="${p.mask}" alt="" aria-hidden="true" draggable="false" />`;
  const b = p.box;
  return `<div class="hl-box${cls}" data-id="${p.id}" style="left:${b[0]}%;top:${b[2]}%;width:${b[1]-b[0]}%;height:${b[3]-b[2]}%"></div>`;
}

// Blurred extension of a photo: the photo is mirrored on all 8 sides, then softened.
// Mirroring keeps colours continuous at the photo's edge, so the seam blends in.
// (Built tiny and blurred by shrinking/enlarging, so it is cheap on phones and needs no CSS filter.)
const backdropCache = {};
function makeBackdrop(img, sc){
  const tw = 240, th = Math.round(tw*sc.h/sc.w), px = Math.round(tw*WORLD_PAD), py = Math.round(th*WORLD_PAD);
  let c = document.createElement('canvas'); c.width = tw + 2*px; c.height = th + 2*py;
  const x = c.getContext('2d');
  for(let ix = -1; ix <= 1; ix++) for(let iy = -1; iy <= 1; iy++){
    x.save(); x.translate(px + tw/2 + ix*tw, py + th/2 + iy*th); x.scale(ix ? -1 : 1, iy ? -1 : 1);
    x.drawImage(img, -tw/2, -th/2, tw, th); x.restore();
  }
  const [w0, h0] = [c.width, c.height];
  const resize = (src, w, h) => { const o = document.createElement('canvas'); o.width = w; o.height = h; const g = o.getContext('2d'); g.imageSmoothingQuality = 'high'; g.drawImage(src, 0, 0, w, h); return o; };
  for(let i = 0; i < 3; i++) c = resize(c, Math.max(4, c.width >> 1), Math.max(4, c.height >> 1));   // shrink…
  for(let i = 0; i < 3; i++) c = resize(c, c.width*2, c.height*2);                                    // …and grow back = blur
  c = resize(c, w0, h0);
  const g = c.getContext('2d'); g.fillStyle = 'rgba(0,0,0,.22)'; g.fillRect(0, 0, w0, h0);            // slightly darker than the sharp photo
  return c;
}
function paintBackdrop(canvas, scene, img){
  const draw = () => {
    const src = backdropCache[scene] || (backdropCache[scene] = makeBackdrop(img, SCENES[scene]));
    canvas.width = src.width; canvas.height = src.height; canvas.getContext('2d').drawImage(src, 0, 0);
  };
  if(img.complete && img.naturalWidth) draw(); else img.addEventListener('load', draw, {once:true});
}

function viewerHTML(scene, cards, allOn){
  const s = SCENES[scene], total = 1 + 2*WORLD_PAD, off = WORLD_PAD/total*100, size = 100/total;   // where the photo sits inside the world, in %
  const layers = [...cards].sort((a, b) => areaOf(b) - areaOf(a)).map(c => highlightLayer(c, allOn)).join('');   // small parts on top
  return `<div class="viewer" data-scene="${scene}">
      <div class="world">
        <canvas class="pad"></canvas>
        <div class="photo" style="left:${off}%;top:${off}%;width:${size}%;height:${size}%;--feather:${EDGE_FEATHER}%"><img class="base" src="${s.image}" alt="${s.title}" draggable="false"/>${layers}</div>
      </div>
      <div class="fov"></div><div class="fov-dark"></div>
      <div class="hud"></div><div class="sel-pill"></div><div class="look-hint">↔↕ Arrastra para mirar alrededor</div>
    </div>
    <button class="fab" data-action="menu" aria-label="Menú">☰</button>`;
}

let viewerCtl = null;
function mountViewer(onTap, getPrefer){
  const el = document.querySelector('.viewer'); if(!el) return null;
  const world = el.querySelector('.world'), photo = el.querySelector('.photo'), scene = el.dataset.scene, sc = SCENES[scene], hint = el.querySelector('.look-hint');
  paintBackdrop(el.querySelector('.pad'), scene, el.querySelector('.base'));
  let vw = 0, vh = 0, W = 0, H = 0, pw = 0, ph = 0, x = 0, y = 0, cx = .5, cy = .5, raf = 0;   // W,H = whole world · pw,ph = the sharp photo inside it
  // pan limits per axis: while the photo fills the screen you can drag across it (+ a thin margin);
  // once it is smaller than the screen on an axis it simply stays centred on that axis
  const axis = (v, view, o, size, m) => { const lo = o-m, hi = o+size+m; return hi-lo >= view ? Math.min(-lo, Math.max(view-hi, v)) : view/2-(o+size/2); };
  const clampX = v => axis(v, vw, pw*WORLD_PAD, pw, pw*PAN_MARGIN), clampY = v => axis(v, vh, ph*WORLD_PAD, ph, ph*PAN_MARGIN);
  const clamp = () => { x = clampX(x); y = clampY(y); };
  const apply = () => { world.style.transform = `translate3d(${x}px,${y}px,0)`; };
  const syncCenter = () => { cx = (vw/2-x)/W; cy = (vh/2-y)/H; };
  function layout(){
    vw = el.clientWidth; vh = el.clientHeight; if(!vw || !vh) return;
    const kNear = Math.max(vh*PHOTO_ZOOM.h/sc.h, vw*PHOTO_ZOOM.w/sc.w);                                   // photo fills the screen
    const kFar  = Math.min(kNear, Math.max(Math.min(vw/sc.w, vh/sc.h), vw/(sc.w*(1+2*WORLD_PAD)), vh/(sc.h*(1+2*WORLD_PAD))));   // whole photo in view, but never more than the blurred extension can cover
    const k = kNear*Math.pow(kFar/kNear, zoomOut); pw = sc.w*k; ph = sc.h*k;
    W = pw*(1+2*WORLD_PAD); H = ph*(1+2*WORLD_PAD);
    world.style.width = W+'px'; world.style.height = H+'px';
    x = vw/2-cx*W; y = vh/2-cy*H; clamp(); apply(); syncCenter();
  }
  layout(); new ResizeObserver(layout).observe(el);

  let down = null, moved = false, vx = 0, vy = 0, lt = 0, sx = 0, sy = 0, lx = 0, ly = 0;
  el.addEventListener('pointerdown', e => {
    if(down !== null) return;
    down = e.pointerId; moved = false; vx = vy = 0; cancelAnimationFrame(raf);
    sx = lx = e.clientX; sy = ly = e.clientY; lt = performance.now(); el.setPointerCapture(e.pointerId);
  });
  el.addEventListener('pointermove', e => {
    if(e.pointerId !== down) return;
    if(!moved && Math.hypot(e.clientX-sx, e.clientY-sy) > 8){ moved = true; hint.classList.add('gone'); }
    if(!moved) return;
    const dx = e.clientX-lx, dy = e.clientY-ly, now = performance.now(), dt = Math.max(1, now-lt);
    x += dx; y += dy; clamp(); apply(); vx = dx/dt*16; vy = dy/dt*16; lx = e.clientX; ly = e.clientY; lt = now;
  });
  const end = e => {
    if(e.pointerId !== down) return;
    down = null;
    if(!moved){   // a tap — measured against the sharp photo, so masks/boxes stay exactly where they were drawn
      const r = photo.getBoundingClientRect();
      onTap(hitTest(scene, (e.clientX-r.left)/r.width, (e.clientY-r.top)/r.height, r.width, getPrefer ? getPrefer() : undefined), e);
      return;
    }
    const glide = () => {
      vx *= .94; vy *= .94;
      if(Math.abs(vx) < .2 && Math.abs(vy) < .2){ syncCenter(); return; }
      x += vx; y += vy; clamp(); apply(); raf = requestAnimationFrame(glide);
    };
    if(performance.now()-lt < 80) glide(); else syncCenter();
  };
  el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
  el.addEventListener('dragstart', e => e.preventDefault());

  viewerCtl = { relayout: layout, lookAt(p){   // smoothly pan so a part is centred
    cancelAnimationFrame(raf);
    const ox = pw*WORLD_PAD, oy = ph*WORLD_PAD;
    const tx = vw/2-(ox+(p.box[0]+p.box[1])/200*pw), ty = vh/2-(oy+(p.box[2]+p.box[3])/200*ph), x0 = x, y0 = y, t0 = performance.now();
    const step = n => {
      const k = Math.min(1, (n-t0)/450), e = 1-Math.pow(1-k, 3);
      x = x0+(clampX(tx)-x0)*e; y = y0+(clampY(ty)-y0)*e; apply();
      if(k < 1) raf = requestAnimationFrame(step); else syncCenter();
    };
    raf = requestAnimationFrame(step);
  } };
  return viewerCtl;
}

/* ================= 4. STATE + SOUNDS ================= */

const state = {screen:'home', sceneIndex:0, exam:[], examIndex:0, score:0, hearts:MAX_HEARTS, mistakes:[], selected:null, answerLocked:false};
const app = document.getElementById('app');
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, m => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[m]));
const heartsText = () => '♥'.repeat(state.hearts) + '♡'.repeat(MAX_HEARTS - state.hearts);

const sfxCache = {};
function sfx(file, vol = 1){
  try{
    const base = sfxCache[file] || (sfxCache[file] = Object.assign(new Audio('assets/sounds/'+file), {preload:'auto'}));
    const a = base.cloneNode(true); a.volume = vol; a.play().catch(() => {});
  }catch(e){}
}
let actx = null;
const Sound = {
  correct:     () => sfx('correct-bell.wav', .9),
  wrong:       () => sfx('wrong-bell.wav', .9),
  pageForward: () => sfx('page-forward.wav', .9),
  pageBack:    () => sfx('page-back.wav', .9),
  countdown:   () => sfx('countdown.mp3', 1),
  pop:         () => sfx('pop.wav', .7),
  next:        () => { sfx('whoosh.wav', .8); setTimeout(() => sfx('pop.wav', .7), 110); setTimeout(() => sfx('ding.wav', .8), 200); },
  tick:        () => {   // short synthesized clock tick
    try{
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if(actx.state === 'suspended') actx.resume();
      const t = actx.currentTime, o = actx.createOscillator(), g = actx.createGain();
      o.type = 'square'; o.frequency.value = 900;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.09, t+.004); g.gain.exponentialRampToValueAtTime(.0001, t+.07);
      o.connect(g).connect(actx.destination); o.start(t); o.stop(t+.09);
    }catch(e){}
  },
};
const play = name => { try{ Sound[name]?.(); }catch(e){} };

/* ================= 5. SCREENS + POPUPS ================= */

const ICON = {book:'▤', play:'▶', home:'⌂'};
const setBodyCam = on => document.body.classList.toggle('cam', on);

function renderHome(){
  app.innerHTML = `<section class="home">
    <button class="big-btn review" data-action="review">Reseña</button>
    <button class="big-btn exam" data-action="exam">Examen</button>
  </section>`;
}

function closePops(){
  document.querySelectorAll('.explain-overlay').forEach(o => o.remove());
  document.querySelectorAll('.hl-img.focus,.hl-box.focus').forEach(h => h.classList.remove('focus'));
}
function popup(html, {lock = false} = {}){
  closePops();
  const o = document.createElement('div'); o.className = 'explain-overlay';
  o.innerHTML = `<div class="cloud-backdrop" ${lock ? '' : 'data-action="closeExplanation"'}></div><div class="pop-card">${html}</div>`;
  document.body.appendChild(o); return o;
}
// bottom "cloud" sheet used for part explanations
function cloudSheet(tag, title, text, btnLabel, btnAction){
  closePops();
  const o = document.createElement('div'); o.className = 'explain-overlay sheet';
  o.innerHTML = `<div class="cloud-backdrop" data-action="closeExplanation"></div><div class="cloud-card"><div class="cloud-face">☁️</div><div class="cloud-body"><div class="mini-tag">${esc(tag)}</div><h2>${esc(title)}</h2><p>${esc(text)}</p><button class="yellow-btn" data-action="${btnAction}">${btnLabel}</button></div></div>`;
  document.body.appendChild(o);
}

// Draws a photo full-screen. hud = text in the little top-left pill.
function showScene(scene, {hud = '', allOn = false, onTap = () => {}, getPrefer} = {}){
  setBodyCam(true);
  app.innerHTML = viewerHTML(scene, cardsForScene(scene), allOn);
  $('.hud').innerHTML = hud;
  return mountViewer(onTap, getPrefer);
}

function setZoomOut(t){
  zoomOut = Math.min(1, Math.max(0, t));
  try { localStorage.setItem('kiaZoomOut', String(zoomOut)); } catch(e){}
  if(viewerCtl && document.querySelector('.viewer')) viewerCtl.relayout();
}
const zoomRowHTML = () => document.querySelector('.viewer') ? `<div class="zoom-row">
      <label class="zoom-title" for="zoomSlider">🔍 Zoom</label>
      <input id="zoomSlider" class="zoom-slider" type="range" min="0" max="100" step="1" value="${Math.round(zoomOut*100)}" aria-label="Alejar la foto"/>
      <div class="zoom-ends"><span>Cerca</span><span>Lejos</span></div>
    </div>` : '';

function menuPopup(){
  play('pageForward');
  const inExam = state.screen === 'exam', inReview = state.screen === 'review';
  popup(`<div class="mini-tag">KIA SOUL 2015</div><h2>Menú</h2>
    ${zoomRowHTML()}
    ${inExam ? `<div class="pop-stat"><span class="progress-pill">${state.examIndex+1}/${state.exam.length}</span><span class="hearts">${heartsText()}</span></div>` : ''}
    <div class="pop-col">
      <button class="${inReview ? 'yellow-btn' : 'secondary-btn'}" data-action="review">${ICON.book} Reseña</button>
      <button class="${inExam ? 'yellow-btn' : 'secondary-btn'}" data-action="exam">${ICON.play} Examen</button>
      <button class="secondary-btn" data-action="mistakes">Review all the mistakes</button>
      <button class="secondary-btn" data-action="home">${ICON.home} Inicio</button>
      <button class="secondary-btn" data-action="closeExplanation">Seguir mirando</button>
    </div>`);
}

function home(){ setBodyCam(false); state.screen = 'home'; renderHome(); }

const CAM_SCREENS = ['review', 'exam', 'results', 'mistakes'];
function render(){
  setBodyCam(CAM_SCREENS.includes(state.screen));
  ({home:renderHome, review:renderReview, exam:renderExam, results:renderResults, mistakes:renderMistakes})[state.screen]?.();
}

/* ================= 6. RESEÑA ================= */

function renderReview(){
  const scene = ACTIVE_SCENES[state.sceneIndex % ACTIVE_SCENES.length], multi = ACTIVE_SCENES.length > 1;
  showScene(scene, {
    hud: `<span class="h">RESEÑA</span> · ${esc(SCENES[scene].title)}`,
    allOn: true,
    onTap: hit => { if(hit) showExplanation(hit); },
  });
  if(multi){   // "¿Sigamos?" = next base photo
    app.insertAdjacentHTML('beforeend', '<button class="yellow-btn next-btn" data-action="nextReview">¿Sigamos?</button>');
    $('.look-hint').classList.add('above');
  }
}

function showExplanation(p){
  play('correct');
  cloudSheet(SCENES[p.scene].title, p.name, p.explanation, 'Tap to exit', 'closeExplanation');
  document.querySelectorAll(`.world [data-id="${p.id}"]`).forEach(h => h.classList.add('focus'));
}

/* ================= 7. EXAMEN ================= */
// Each base photo gets a random 1-4 "find the part" cards (random parts from that photo),
// photos come in the same order as Reseña.

const rand = n => Math.floor(Math.random() * n);
function shuffle(list){
  const a = [...list];
  for(let i = a.length-1; i > 0; i--){ const j = rand(i+1); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function buildExam(){
  return ACTIVE_SCENES.flatMap(scene => {
    const cards = cardsForScene(scene);
    const n = Math.min(cards.length, EXAM_MIN_PER_PHOTO + rand(EXAM_MAX_PER_PHOTO - EXAM_MIN_PER_PHOTO + 1));
    return shuffle(cards).slice(0, n);
  });
}
const currentPart = () => state.exam[state.examIndex];

function startExam(){
  Object.assign(state, {exam:buildExam(), examIndex:0, score:0, hearts:MAX_HEARTS, mistakes:[], selected:null, answerLocked:false, screen:'countdown'});
  renderCountdown();
}

function renderCountdown(){
  app.innerHTML = `<div class="countdown-screen"><div class="count-label">PREPÁRATE</div><div id="count-number">3</div><div class="count-go">FIND THE PART</div></div>`;
  let n = 3; play('countdown');
  const timer = setInterval(() => {
    n--;
    if(n > 0){ $('#count-number').textContent = n; play('tick'); return; }
    clearInterval(timer); $('#count-number').textContent = 'GO!'; play('next');
    setTimeout(() => { state.screen = 'exam'; render(); }, 650);
  }, 850);
}

function examHud(){ return `<span class="h">${heartsText()}</span> ${state.examIndex+1}/${state.exam.length} · ${esc(currentPart().name)}`; }
function updateHud(){ const h = $('.hud'); if(h) h.innerHTML = examHud(); }

function renderExam(){
  const p = currentPart(); state.selected = null;
  showScene(p.scene, {
    hud: examHud(),
    getPrefer: () => state.selected || undefined,
    onTap: hit => {
      if(state.answerLocked) return;
      if(!hit){ setSelected(null); return; }
      if(state.selected === hit.id){ hit.name === p.name ? answerExam() : wrongExam(); }   // second tap = final answer
      else { setSelected(hit.id); play('pop'); }                                      // first tap = show yellow mask
    },
  });
  popup(`<div class="question-small">${state.examIndex+1}/${state.exam.length} · FIND THIS PART</div><h2 style="font-size:2rem;margin:8px 0 6px">${esc(p.name)}</h2><p>Toca la parte para marcarla en amarillo.<br>Tócala otra vez para confirmar.</p><button class="yellow-btn" data-action="closeExplanation">¡Listo!</button>`);
}

function setSelected(id){
  state.selected = id;
  document.querySelectorAll('.world .hl-img,.world .hl-box').forEach(h => h.classList.toggle('on', Number(h.dataset.id) === id));
  const pill = $('.sel-pill'); if(pill){ pill.textContent = 'Toca otra vez para confirmar'; pill.classList.toggle('on', id !== null); }
}

// little message in the middle of the screen
function flash(html, cls, ms, then){
  const f = document.createElement('div'); f.className = 'feedback';
  f.innerHTML = `<div class="bubble ${cls}">${html}</div>`; document.body.appendChild(f);
  setTimeout(() => { f.remove(); then(); }, ms);
}

function answerExam(){
  if(state.answerLocked) return;
  state.answerLocked = true; state.score++; play('correct');
  showPraise(); burst('💗', 18);
  setTimeout(nextExam, 850);
}

function wrongExam(){
  if(state.answerLocked) return;
  const p = currentPart();
  state.answerLocked = true; state.hearts = Math.max(0, state.hearts-1); play('wrong'); updateHud();
  if(!state.mistakes.some(m => m.id === p.id)) state.mistakes.push(p);
  flash(`Try again!<small>${esc(p.name)}</small>`, 'bad', 700, () => {
    if(state.hearts === 0){ state.screen = 'results'; render(); return; }   // out of hearts: game over
    state.answerLocked = false; setSelected(null); updateHud();
  });
}

function nextExam(){
  if(state.examIndex >= state.exam.length-1){ state.screen = 'results'; render(); return; }
  state.examIndex++; state.answerLocked = false; state.selected = null; render(); play('next');
}

function renderResults(){
  showScene(currentPart().scene);
  const tried = state.examIndex + 1, lost = state.hearts === 0;
  popup(`<div style="font-size:3.4rem">🏁</div><h2>${lost ? '¡Te quedaste sin vidas!' : '¡Terminaste!'}</h2><div class="result-score">${state.score}/${tried}</div><p>Acertaste ${state.score} tarjetas.</p>
    <div class="pop-col"><button class="yellow-btn" data-action="exam">Jugar otra vez</button>${state.mistakes.length ? `<button class="secondary-btn" data-action="mistakes">Review all the mistakes (${state.mistakes.length})</button>` : ''}<button class="secondary-btn" data-action="home">${ICON.home} Inicio</button></div>`, {lock:true});
}

// Praise word + heart explosion for a correct answer
const PRAISE = ['Sweet!', 'Correcto', 'Genial', 'ANG GALING', 'AWESOME', 'COOL', 'GREAT', 'Chido', 'QUE PADRE', 'PADRISIMO'];
const PRAISE_COLORS = ['#ff617f', '#ff9f43', '#62b66f', '#a05cff', '#4ca6ff', '#ff4e7a', '#f2b600'];
const pick = list => list[rand(list.length)];

function showPraise(){
  const p = document.createElement('div');
  p.className = 'praise'; p.textContent = pick(PRAISE); p.style.color = pick(PRAISE_COLORS);
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 700);
}

function burst(symbol, n){
  let root = $('#burst');
  if(!root){ root = document.createElement('div'); root.id = 'burst'; root.className = 'burst'; document.body.appendChild(root); }
  for(let i = 0; i < n; i++){
    const x = document.createElement('span');
    x.className = 'particle'; x.textContent = symbol;
    x.style.left = (50 + Math.random()*10 - 5) + '%';
    x.style.top = (42 + Math.random()*12 - 6) + '%';
    x.style.setProperty('--dx', (Math.random()*360 - 180) + 'px');
    x.style.setProperty('--dy', (Math.random()*460 - 230) + 'px');
    x.style.setProperty('--r', (Math.random()*540 - 270) + 'deg');
    x.style.animationDelay = (Math.random()*0.15) + 's';
    root.appendChild(x);
    setTimeout(() => x.remove(), 1300);
  }
}

/* ================= 8. MISTAKES ================= */

function renderMistakes(){
  state.screen = 'mistakes';
  showScene(state.mistakes[0]?.scene || ACTIVE_SCENES[0], {hud:'<span class="h">MISTAKES</span>'});
  showMistakeList();
}

function showMistakeList(){
  document.querySelectorAll('.world .on').forEach(h => h.classList.remove('on'));
  const buttons = `<div class="pop-col"><button class="secondary-btn" data-action="home">${ICON.home} Inicio</button><button class="secondary-btn" data-action="closeExplanation">Seguir mirando</button></div>`;
  if(!state.mistakes.length){ popup(`<div class="mini-tag">REVIEW</div><h2>Mistakes</h2><p>¡Sin errores por ahora! 🎉</p>${buttons}`); return; }
  popup(`<div class="mini-tag">REVIEW</div><h2>Mistakes</h2><p>Toca una tarjeta para ver la parte resaltada.</p>
    <div class="pop-list">${state.mistakes.map(p => `<button class="mistake-card" data-action="mistakeOpen" data-id="${p.id}"><span class="mistake-icon">☁️</span><span class="mistake-name">${esc(p.name)}</span><small>${esc(SCENES[p.scene].title)}</small></button>`).join('')}</div>${buttons}`);
}

function openMistake(id){
  const p = state.mistakes.find(m => m.id === id); if(!p) return;
  closePops();
  if($('.viewer')?.dataset.scene !== p.scene) showScene(p.scene, {hud:'<span class="h">MISTAKES</span>'});   // mistake is on another photo
  document.querySelectorAll('.world .hl-img,.world .hl-box').forEach(h => h.classList.toggle('on', Number(h.dataset.id) === p.id));
  viewerCtl?.lookAt(p);
  cloudSheet('REVIEW', p.name, p.explanation, 'Volver', 'mistakes');
  play('pageForward');
}

/* ================= 9. WIRING ================= */

document.addEventListener('input', e => { if(e.target.classList && e.target.classList.contains('zoom-slider')) setZoomOut(e.target.value/100); });

document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]'); if(!el) return;
  switch(el.dataset.action){
    case 'menu':             menuPopup(); break;
    case 'closeExplanation': closePops(); break;
    case 'home':             closePops(); home(); play('pageBack'); break;
    case 'review':           closePops(); state.screen = 'review'; state.sceneIndex = 0; render(); play('pageForward'); break;
    case 'nextReview':       closePops(); state.sceneIndex = (state.sceneIndex+1) % ACTIVE_SCENES.length; render(); play('next'); break;
    case 'exam':             closePops(); startExam(); break;
    case 'mistakes':
      if(state.screen === 'mistakes' && $('.viewer')) showMistakeList();
      else { closePops(); state.screen = 'mistakes'; render(); }
      break;
    case 'mistakeOpen':      openMistake(Number(el.dataset.id)); break;
  }
});

renderHome();
