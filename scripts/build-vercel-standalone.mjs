import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");
let html = readFileSync(join(outDir, "index.html"), "utf8");
const cssFile = html.match(/href="(\/_next\/static\/[^"]+\.css)"/)?.[1];
if (!cssFile) throw new Error("No se encontró el CSS exportado");
const css = readFileSync(join(outDir, cssFile.slice(1)), "utf8");

const toWebp = (relativePath, options = {}) => {
  const source = join(outDir, relativePath.replace(/^\//, ""));
  const args = [source];
  if (options.frame) args.unshift("-define", "webp:lossless=false");
  args.push("-resize", options.size ?? "900x900>", "-strip", "-quality", options.quality ?? "62", "webp:-");
  const buffer = execFileSync("convert", args, { maxBuffer: 12 * 1024 * 1024 });
  return `data:image/webp;base64,${buffer.toString("base64")}`;
};

const videoPoster = (relativePath, second = "2") => {
  const source = join(outDir, relativePath.replace(/^\//, ""));
  const buffer = execFileSync("ffmpeg", ["-loglevel", "error", "-ss", second, "-i", source, "-frames:v", "1", "-vf", "scale='min(720,iw)':-2", "-c:v", "libwebp", "-quality", "58", "-f", "image2pipe", "pipe:1"], { maxBuffer: 12 * 1024 * 1024 });
  return `data:image/webp;base64,${buffer.toString("base64")}`;
};

const compactVideo = (relativePath) => {
  const source = join(outDir, relativePath.replace(/^\//, ""));
  const buffer = execFileSync("ffmpeg", ["-loglevel", "error", "-i", source, "-vf", "scale=360:-2,fps=20", "-c:v", "libx264", "-preset", "medium", "-crf", "33", "-c:a", "aac", "-b:a", "48k", "-movflags", "frag_keyframe+empty_moov", "-f", "mp4", "pipe:1"], { maxBuffer: 12 * 1024 * 1024 });
  return `data:video/mp4;base64,${buffer.toString("base64")}`;
};

const proposalPoster = videoPoster("/propuesta-agostina.mp4", "1");
const contentPoster = videoPoster("/evidencias/produccion.mp4", "3");
const productionVideo = compactVideo("/evidencias/produccion.mp4");
let videoIndex = 0;
html = html.replace(/<video\b[^>]*>[\s\S]*?<\/video>/g, () => {
  const current = videoIndex++;
  if (current === 1) return `<video autoplay muted loop playsinline controls><source src="${productionVideo}" type="video/mp4"></video>`;
  const first = current === 0;
  const poster = first ? proposalPoster : contentPoster;
  const label = first ? "Conocé mi propuesta" : "Producción de contenido";
  return `<div class="videoFallback"><img src="${poster}" alt="${label}"/><span>${label}</span></div>`;
});

const embedded = new Map();
html = html.replace(/(?:src|poster)="(\/(?!_next\/)[^"]+\.(?:png|jpe?g|webp))"/gi, (whole, asset) => {
  if (!embedded.has(asset)) {
    const isLogo = asset.includes("logo") || asset.includes("logos/");
    embedded.set(asset, toWebp(asset, { size: isLogo ? "420x420>" : "900x900>", quality: isLogo ? "70" : "62" }));
  }
  return `src="${embedded.get(asset)}"`;
});

html = html
  .replace(/<link[^>]+rel="stylesheet"[^>]*>/g, "")
  .replace(/<link[^>]+rel="modulepreload"[^>]*>/g, "")
  .replace(/<link[^>]+as="script"[^>]*>/g, "")
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
  .replace(/<script\b[^>]*\/>/g, "");

const standaloneCss = `
${css}
.videoFallback{position:relative;width:100%;height:100%;min-height:inherit;overflow:hidden;background:#111}.videoFallback img{width:100%;height:100%;object-fit:cover;display:block}.videoFallback span{position:absolute;left:18px;bottom:18px;background:#fff9f7;color:#1e1e1e;padding:9px 12px;font-size:9px;font-weight:800;letter-spacing:1px;text-transform:uppercase}.standaloneModal{position:fixed;inset:0;z-index:200;background:#0c0c0cee;display:grid;place-items:center;padding:24px;backdrop-filter:blur(12px)}.standaloneModal>article{width:min(980px,96vw);max-height:90vh;overflow:auto;display:grid;grid-template-columns:1fr 1fr;background:#1d1d1d;color:#fff9f7;box-shadow:0 30px 80px #000b}.standaloneModal img,.standaloneModal video{width:100%;height:100%;min-height:540px;object-fit:contain;object-position:center;background:#111;padding:18px}.standaloneModal section{padding:clamp(30px,5vw,64px);display:flex;flex-direction:column;justify-content:center}.standaloneModal small{color:#ca7374;font-weight:800;letter-spacing:1.2px}.standaloneModal h3{font-size:clamp(38px,5vw,64px);line-height:1;margin:18px 0}.standaloneModal p{line-height:1.65;color:#c5b9b6}.standaloneModal ul{padding:20px 0;list-style:none;border-block:1px solid #ffffff26}.standaloneModal li{margin:10px 0;font-size:12px}.standaloneModal a{display:flex;justify-content:space-between;padding-bottom:8px;border-bottom:1px solid;font-weight:800}.standaloneClose{position:fixed;right:20px;top:14px;width:48px;height:48px;border-radius:50%;border:1px solid #ffffff66;background:#171717;color:white;font-size:28px;cursor:pointer;z-index:2}@media(max-width:760px){.standaloneModal>article{grid-template-columns:1fr}.standaloneModal img,.standaloneModal video{min-height:260px;height:34vh;padding:10px}.standaloneModal section{padding:28px 23px}}
`;

const standaloneJs = `
(()=>{const root=document.querySelector('main');const toggle=document.querySelector('.themeToggle');const menu=document.querySelector('.menuButton');const links=document.querySelector('.navLinks');toggle?.addEventListener('click',()=>{const dark=root.classList.toggle('darkMode');root.classList.toggle('lightMode',!dark);toggle.querySelector('span').textContent=dark?'☀':'☾'});menu?.addEventListener('click',()=>links?.classList.toggle('open'));const services=[['Gestión de redes','Planificación, calendario, publicación y seguimiento. Para que tus redes tengan dirección, no solo movimiento.',['Calendario mensual con objetivos claros','Publicación y seguimiento de cada pieza','Análisis para decidir qué sostener y qué ajustar']],['Estrategia','Objetivos claros, pilares de contenido y decisiones basadas en lo que tu marca necesita de verdad.',['Diagnóstico del punto de partida','Pilares y formatos pensados para tu público','Decisiones respaldadas por métricas reales']],['Diseño visual','Piezas, carruseles e historias que se reconocen como tuyas y hacen que tu perfil se vea profesional.',['Sistema visual coherente y reconocible','Logo, paleta, tipografías y aplicaciones','Diseños adaptados a cada canal']],['Producción','Voy a tu negocio, saco fotos, grabo, edito y convierto lo cotidiano en contenido que conecta.',['Jornadas presenciales en tu negocio','Fotografía y grabación de situaciones reales','Edición de reels y contenido listo para publicar']]];let modal;const close=()=>{modal?.remove();modal=null;document.body.style.overflow=''};document.addEventListener('keydown',e=>e.key==='Escape'&&close());document.querySelectorAll('.serviceTile').forEach((tile,i)=>tile.addEventListener('click',()=>{const s=services[i];const video=tile.querySelector('video source');const image=tile.querySelector('img')?.src||'';const media=video?'<video autoplay muted loop playsinline controls><source src="'+video.src+'" type="video/mp4"></video>':'<img src="'+image+'" alt="Ejemplo de '+s[0]+'">';modal=document.createElement('div');modal.className='standaloneModal';modal.innerHTML='<button class="standaloneClose" aria-label="Cerrar">×</button><article>'+media+'<section><small>0'+(i+1)+' · SERVICIO</small><h3>'+s[0]+'</h3><p>'+s[1]+'</p><ul>'+s[2].map(x=>'<li>✓ '+x+'</li>').join('')+'</ul><a href="#contacto">Quiero trabajar este servicio <b>↗</b></a></section></article>';modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('.standaloneClose'))close()});modal.querySelector('article').addEventListener('click',e=>e.stopPropagation());document.body.appendChild(modal);document.body.style.overflow='hidden'}));document.querySelectorAll('.iphoneMockup').forEach(button=>button.addEventListener('click',()=>{const image=button.querySelector('img')?.src;if(!image)return;modal=document.createElement('div');modal.className='standaloneModal';modal.innerHTML='<button class="standaloneClose" aria-label="Cerrar">×</button><article style="display:block;width:min(520px,92vw);background:transparent;box-shadow:none"><img style="min-height:0;max-height:86vh;object-fit:contain;object-position:center" src="'+image+'" alt="Estadísticas ampliadas"></article>';modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('.standaloneClose'))close()});document.body.appendChild(modal);document.body.style.overflow='hidden'}));document.querySelector('form')?.addEventListener('submit',e=>{e.preventDefault();e.currentTarget.innerHTML='<div class="sentMessage"><b>¡Gracias por escribirme!</b><p>Ya tengo tu consulta. También podés hablarme por WhatsApp.</p></div>'})})();
`;

html = html.replace("</head>", `<style>${standaloneCss}</style></head>`).replace("</body>", `<script>${standaloneJs}</script></body>`);
const destination = join(root, ".vercel-standalone", "index.html");
mkdirSync(dirname(destination), { recursive: true });
writeFileSync(destination, html);
console.log(destination);
