"use client";
import { useEffect, useRef, useState } from "react";

const WHATSAPP = "5491162667127";
const waLink = (text: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
const HELLO = "¡Hola Agos! Vi tu web y quiero consultarte por mis redes.";

const nav = [
  ["Resultados", "#resultados"],
  ["Servicios", "#servicios"],
  ["Trabajos", "#trabajos"],
  ["Sobre mí", "#sobre-mi"],
  ["Planes", "#planes"],
];

const clients = [
  { name: "Dulce Manía", logo: "/logos/dulce-mania.webp", ig: "https://www.instagram.com/dmania.ok/" },
  { name: "Heladería Isabella", logo: "/logos/isabella.webp", ig: "https://www.instagram.com/heladosisabella/" },
  { name: "Outlet Factory", logo: "/logos/outlet.webp", wide: true, ig: "https://www.instagram.com/outletfactory.varela/" },
  { name: "El Emporio", logo: "/logos/emporio.webp", ig: "https://www.instagram.com/autoparteselemporio/" },
  { name: "La Granja de Rotta", logo: "/logos/granja.webp" },
  { name: "Memphis Complejo Deportivo", logo: "/logos/memphis.webp", wide: true, ig: "https://www.instagram.com/memphiscomplejodeportivo/" },
  { name: "RTO Revicar", logo: "/logos/rto-revicar.webp", wide: true, ig: "https://www.instagram.com/revicar_rto/" },
  { name: "Tapicería Rey", logo: "/logos/tapiceria-rey.jpg", tall: true, ig: "https://www.instagram.com/tapiceriarey.ok/" },
  { name: "Sanar Pilates", logo: "/logos/sanar-pilates.jpg", tall: true, ig: "https://www.instagram.com/sanar_pilates/" },
];

const services = [
  { n: "01", title: "Gestión de redes", copy: "Planificación, calendario, publicación y seguimiento. Para que tus redes tengan dirección, no solo movimiento.", items: ["Calendario mensual con objetivos claros", "Publicación y seguimiento de cada pieza", "Análisis para decidir qué sostener y qué ajustar"], image: "/evidencias/dulce-despues.webp", pos: "50% 18%" },
  { n: "02", title: "Estrategia", copy: "Objetivos claros, pilares de contenido y decisiones basadas en lo que tu marca necesita de verdad.", items: ["Diagnóstico del punto de partida", "Pilares y formatos pensados para tu público", "Decisiones respaldadas por métricas reales"], image: "/evidencias/metricas-30-dias.webp", pos: "50% 0%" },
  { n: "03", title: "Diseño e identidad", copy: "Piezas, carruseles e historias que se reconocen como tuyas. Si hace falta, también el branding completo.", items: ["Logo, paleta, tipografías y aplicaciones", "Sistema visual coherente en cada canal", "Cartelería y piezas para el local"], image: "/evidencias/outlet-identidad.webp", pos: "30% 50%" },
  { n: "04", title: "Producción", copy: "Voy a tu negocio, saco fotos, grabo, edito y convierto lo cotidiano en contenido que conecta.", items: ["Jornadas presenciales en tu negocio", "Fotografía y grabación de situaciones reales", "Edición de reels listos para publicar"], video: "/evidencias/produccion.mp4", pos: "50% 22%" },
];

const results = [
  { value: "6,8 M", label: "visualizaciones en una sola publicación" },
  { value: "2,6 M", label: "cuentas alcanzadas con contenido orgánico" },
  { value: "+2.253%", label: "de crecimiento frente al mes anterior" },
  { value: "+1.422", label: "seguidores nuevos desde una pieza" },
];

const evidence = [
  { src: "/evidencias/reel-viral.webp", caption: "Publicación con 6,8 M de visualizaciones" },
  { src: "/evidencias/metricas-marzo.webp", caption: "Marzo: 3,7 M de visualizaciones" },
  { src: "/evidencias/metricas-mayo.webp", caption: "Mayo: 491 mil visualizaciones" },
  { src: "/evidencias/metricas-julio.webp", caption: "Julio: 91% de alcance a no seguidores" },
];

const plans = [
  { name: "Esencial", price: "$125.000", copy: "Para ordenar tu comunicación y empezar a aparecer con constancia.", items: ["1 publicación semanal", "1 a 2 historias", "Edición", "Planificación"], ideal: "Publicás sin una frecuencia clara y necesitás una base profesional." },
  { name: "Crecimiento", price: "$175.000", copy: "Para delegar tus redes y trabajar el crecimiento en serio.", items: ["2 publicaciones semanales", "2 historias", "Producción de contenido", "Gestión y análisis mensual"], ideal: "Querés sostener una estrategia y medir qué contenido funciona." },
  { name: "Premium", price: "$250.000", old: "$300.000", copy: "Gestión integral para marcas que quieren más presencia.", items: ["3 publicaciones semanales", "3 historias", "2 visitas al negocio", "Reels, diseño y análisis"], ideal: "Tu marca necesita volumen de contenido y crecimiento sostenido.", featured: true },
  { name: "E-commerce", price: "$400.000", copy: "Todo el plan Premium, más una web propia para tu marca.", items: ["Todo el plan Premium", "Diseño de página web", "Servicios o catálogo", "Sitio adaptado a celulares"], ideal: "Además de redes, necesitás un espacio propio para vender o recibir consultas." },
];

const steps = [
  ["Nos conocemos", "Charlamos sobre tu marca, tus objetivos y lo que hoy te preocupa."],
  ["Armamos el plan", "Defino la estrategia y la propuesta de contenidos del mes."],
  ["Creamos", "Producimos, diseñamos y editamos cada pieza con una intención."],
  ["Medimos y ajustamos", "Revisamos qué funcionó para tomar mejores decisiones."],
];

const testimonials = [
  { quote: "Nos encanta cómo quedó la cuenta. Se nota muchísimo el cambio y la gente responde cada vez más al contenido.", name: "Dulce Manía", logo: "/logos/dulce-mania.webp" },
  { quote: "Agos entendió lo que queríamos mostrar y logró que nuestra marca se vea mucho más clara, cercana y profesional.", name: "Outlet Factory", logo: "/logos/outlet.webp", wide: true },
  { quote: "Siempre está atenta a cada detalle y transforma lo cotidiano del negocio en contenido que realmente nos representa.", name: "La Granja de Rotta", logo: "/logos/granja.webp" },
];

const faqs = [
  ["¿Trabajás con cualquier tipo de negocio?", "Trabajo principalmente con comercios, marcas de productos y servicios que valoran una comunicación cercana y están dispuestos a construir un proceso."],
  ["¿Tengo que generar yo el contenido?", "No necesariamente. Puedo ocuparme de la producción de fotos y videos en tu negocio, además del diseño y la edición."],
  ["¿Cuánto tarda en verse un cambio?", "Ordenar la identidad y la comunicación se nota rápido; crecer y generar comunidad lleva constancia. No prometo resultados mágicos: construimos objetivos medibles."],
  ["¿Podés trabajar solo una campaña?", "Sí. También podemos hacer una jornada de contenido, un lanzamiento o una campaña puntual sin contratar la gestión completa."],
];

const questions = [
  { key: "frequency", title: "¿Con qué frecuencia publicás?", options: ["Sin frecuencia fija", "1 o 2 veces por semana", "3 o más veces por semana"] },
  { key: "identity", title: "¿Tu perfil tiene una identidad visual clara?", options: ["Todavía no", "Más o menos", "Sí, totalmente"] },
  { key: "goal", title: "¿Tenés un objetivo concreto para tus redes?", options: ["No sé por dónde empezar", "Tengo una idea", "Sí, está definido"] },
] as const;
type Key = (typeof questions)[number]["key"];
type Audit = Record<Key, string>;
const tips: Record<Key, string> = {
  frequency: "Tu prioridad es la constancia: con un calendario mensual dejás de decidir qué publicar a último momento y tu comunidad sabe cuándo esperarte.",
  identity: "Tu prioridad es la identidad visual: cuando cada pieza sigue el mismo sistema, tu perfil se reconoce sin leer el nombre.",
  goal: "Tu prioridad es definir un objetivo: vender, recibir consultas o generar comunidad piden contenidos distintos, y sin un norte claro no se puede medir qué funciona.",
};
function diagnose(a: Audit) {
  const keys: Key[] = ["frequency", "identity", "goal"];
  const score = (k: Key) => (questions.find((q) => q.key === k)!.options as readonly string[]).indexOf(a[k]);
  const total = keys.reduce((s, k) => s + score(k), 0);
  const weakest = keys.reduce((w, k) => (score(k) < score(w) ? k : w));
  if (total <= 2) return { level: "Punto de partida", title: "Tus redes necesitan una base antes de crecer.", copy: "Hoy cada publicación arranca de cero. Ordenar frecuencia, identidad y objetivo se nota rápido.", tip: tips[weakest], plan: "Esencial" };
  if (total <= 4) return { level: "Buena base", title: "Hay una buena base. Falta convertirla en un proceso.", copy: "Con una estrategia mensual podés sostener lo que ya funciona y medir qué contenidos acercan oportunidades reales.", tip: tips[weakest], plan: "Crecimiento" };
  return { level: "Lista para escalar", title: "Tus redes están ordenadas. Es momento de escalar.", copy: "El siguiente paso es sumar producción, más formatos y análisis para multiplicar el alcance sin perder coherencia.", tip: score("goal") < 2 ? tips.goal : "Tu prioridad es el volumen y la calidad: más reels, producción en tu negocio y análisis mensual.", plan: "Premium" };
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sound, setSound] = useState(false);
  const [box, setBox] = useState<{ src: string; caption: string } | null>(null);
  const [audit, setAudit] = useState<Audit>({ frequency: "", identity: "", goal: "" });
  const [showResult, setShowResult] = useState(false);
  const [plan, setPlan] = useState("");
  const [sent, setSent] = useState(false);
  const [ready, setReady] = useState(false);
  const [showWa, setShowWa] = useState(false);
  const heroVideo = useRef<HTMLVideoElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const pauseLogos = useRef<(ms?: number) => void>(() => {});
  const complete = Object.values(audit).every(Boolean);
  const result = complete ? diagnose(audit) : null;

  useEffect(() => {
    const v = heroVideo.current;
    if (v) {
      v.muted = true;
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      if (!conn?.saveData && !matchMedia("(prefers-reduced-motion: reduce)").matches) v.play().catch(() => {});
    }
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const contact = document.getElementById("contacto");
      const inContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.85 : false;
      setShowWa(window.scrollY > window.innerHeight * 0.6 && !inContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pending = new Set(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let ticking = false;
    const check = () => {
      ticking = false;
      const limit = window.innerHeight * 0.9;
      pending.forEach((el) => {
        if (el.getBoundingClientRect().top < limit) { el.classList.add("shown"); pending.delete(el); }
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(check); } };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const f = requestAnimationFrame(() => setReady(true));
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(f); };
  }, []);

  useEffect(() => {
    if (!menu && !box) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenu(false); setBox(null); } };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", esc); };
  }, [menu, box]);

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pos = 0, last = performance.now(), raf = 0, paused = false, hover = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let drag: { x: number; left: number; id: number; moving: boolean } | null = null;
    let blockClick = false;
    const half = () => el.scrollWidth / 2;
    const wrap = () => {
      const h = half();
      if (h <= 0) return;
      if (el.scrollLeft >= h) el.scrollLeft -= h;
      else if (el.scrollLeft < 1) el.scrollLeft += h;
    };
    const pause = (ms = 2500) => {
      paused = true;
      clearTimeout(timer);
      timer = setTimeout(() => { if (!hover && !drag) { paused = false; pos = el.scrollLeft; } }, ms);
    };
    pauseLogos.current = pause;
    const tick = (t: number) => {
      const dt = Math.min(t - last, 50);
      last = t;
      if (!paused && !reduce) { pos += dt * 0.035; el.scrollLeft = pos; }
      wrap();
      if (paused || reduce) pos = el.scrollLeft;
      raf = requestAnimationFrame(tick);
    };
    const down = (e: PointerEvent) => {
      pause(100000);
      if (e.pointerType !== "mouse") return;
      drag = { x: e.clientX, left: el.scrollLeft, id: e.pointerId, moving: false };
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (!drag.moving && Math.abs(dx) > 6) {
        drag.moving = true;
        el.setPointerCapture(drag.id);
        el.classList.add("dragging");
      }
      if (drag.moving) el.scrollLeft = drag.left - dx;
    };
    const up = () => {
      if (drag?.moving) {
        el.releasePointerCapture(drag.id);
        el.classList.remove("dragging");
        blockClick = true;
        setTimeout(() => { blockClick = false; }, 50);
      }
      drag = null;
      pause();
    };
    const click = (e: MouseEvent) => { if (blockClick) { e.preventDefault(); e.stopPropagation(); } };
    const enter = (e: PointerEvent) => { if (e.pointerType === "mouse") { hover = true; pause(100000); } };
    const leave = (e: PointerEvent) => { if (e.pointerType === "mouse") { hover = false; pause(800); } };
    const wheel = () => pause();
    el.scrollLeft = 1;
    pos = 1;
    raf = requestAnimationFrame(tick);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("touchend", up, { passive: true });
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("wheel", wheel, { passive: true });
    el.addEventListener("click", click, true);
    return () => {
      el.removeEventListener("click", click, true);
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("touchend", up);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("wheel", wheel);
    };
  }, []);

  const slideLogos = (dir: number) => {
    const el = logoRef.current;
    if (!el) return;
    pauseLogos.current(3000);
    const item = el.querySelector<HTMLElement>(".logo");
    el.scrollBy({ left: dir * (item ? item.offsetWidth * 2 : 280), behavior: "smooth" });
  };

  const playWithSound = () => {
    const v = heroVideo.current;
    if (!v) return;
    v.loop = false; v.currentTime = 0; v.muted = false; v.volume = 1;
    setSound(true);
    v.play().catch(() => {});
  };

  const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const text = `¡Hola Agos! Soy ${d.get("nombre")}, de ${d.get("marca")}.\n${plan ? `Me interesa el plan ${plan}.\n` : ""}\n${d.get("mensaje")}`;
    const url = waLink(text);
    if (!window.open(url, "_blank", "noopener")) window.location.href = url;
    setSent(true);
  };

  const shot = (src: string, caption: string, alt: string, cls = "") => (
    <button className={`shot ${cls}`} onClick={() => setBox({ src, caption })} aria-label={`Ampliar: ${caption}`}>
      <img src={src} alt={alt} loading="lazy" />
    </button>
  );

  return (
    <main className={ready ? "ready" : ""}>
      <header className={`nav${scrolled ? " solid" : ""}`}>
        <a className="brand" href="#inicio" aria-label="Marghella Studio, inicio">
          <img src="/logo-marghella-icon.png" alt="" />
          <span>Marghella<i>.studio</i></span>
        </a>
        <nav className="navLinks" aria-label="Secciones">
          {nav.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <a className="btn small navCta" href="#contacto">Hablemos <span aria-hidden="true">↗</span></a>
        <button className="menuBtn" onClick={() => setMenu(true)} aria-label="Abrir menú" aria-expanded={menu}><span /><span /></button>
      </header>

      <div className={`menu${menu ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Menú" aria-hidden={!menu}>
        <button className="menuClose" onClick={() => setMenu(false)} aria-label="Cerrar menú">×</button>
        <nav onClick={() => setMenu(false)}>
          {nav.map(([l, h], i) => <a key={h} href={h}><small>0{i + 1}</small>{l}</a>)}
          <a href="#contacto"><small>06</small>Contacto</a>
        </nav>
        <a className="btn" href={waLink(HELLO)} target="_blank" rel="noreferrer">Escribime por WhatsApp <span>↗</span></a>
      </div>

      <section className="hero" id="inicio">
        <div className="glow" aria-hidden="true" />
        <div className="wrap heroGrid">
          <div className="heroCopy">
            <p className="kicker">Community manager · Diseño visual · Contenido</p>
            <h1>Tu marca tiene algo para decir. <em>Hagamos que se note.</em></h1>
            <p className="lead">Estrategia, contenido y diseño para marcas que quieren dejar de improvisar y empezar a comunicar con intención.</p>
            <div className="actions">
              <a className="btn" href="#diagnostico">Diagnóstico gratuito <span>↗</span></a>
              <a className="link" href="#trabajos">Ver trabajos <span>↓</span></a>
            </div>
          </div>
          <div className="heroMedia">
            <div className="videoFrame">
              <video ref={heroVideo} playsInline loop preload="metadata" controls={sound}>
                <source src="/propuesta-agostina.mp4#t=0.3" type="video/mp4" />
              </video>
              {!sound && <button className="soundBtn" onClick={playWithSound}><span aria-hidden="true">▶</span>Conoceme en 24 segundos</button>}
            </div>
          </div>
        </div>
        <div className="wrap heroStats">
          <div><b>{clients.length}</b><span>marcas acompañadas</span></div>
          <div><b>6,8 M</b><span>visualizaciones en una pieza</span></div>
          <div><b>+2.253%</b><span>crecimiento en un mes</span></div>
          <div><b>2023</b><span>acompañando marcas</span></div>
        </div>
      </section>

      <section className="clients" aria-label="Clientes">
        <p className="clientsTitle">Marcas que confían en el proceso</p>
        <div className="logoViewport" ref={logoRef}>
          <div className="logoTrack">
            {[...clients, ...clients].map((c, i) => (
              <figure key={`${c.name}-${i}`} className="logo" aria-hidden={i >= clients.length}>
                {c.ig ? (
                  <a href={c.ig} target="_blank" rel="noopener noreferrer" draggable={false} tabIndex={i >= clients.length ? -1 : 0} aria-label={`Instagram de ${c.name}`}>
                    <span className={`chip${c.tall ? " tall" : ""}${c.wide ? " wide" : ""}`}><img src={c.logo} alt="" loading="lazy" draggable={false} /></span>
                    <figcaption>{c.name}</figcaption>
                  </a>
                ) : (
                  <>
                    <span className={`chip${c.tall ? " tall" : ""}${c.wide ? " wide" : ""}`}><img src={c.logo} alt={i < clients.length ? c.name : ""} loading="lazy" draggable={false} /></span>
                    <figcaption>{c.name}</figcaption>
                  </>
                )}
              </figure>
            ))}
          </div>
        </div>
        <div className="logoNav">
          <button onClick={() => slideLogos(-1)} aria-label="Ver logos anteriores">←</button>
          <span>Deslizá para ver más · Tocá un logo para ver su Instagram</span>
          <button onClick={() => slideLogos(1)} aria-label="Ver más logos">→</button>
        </div>
      </section>

      <section className="section rosewood" id="resultados">
        <div className="wrap">
          <div className="head" data-reveal>
            <p className="label">01 · Resultados</p>
            <h2>No hay milagros. <em>Hay métricas que hablan.</em></h2>
            <p>Datos de los paneles profesionales de las cuentas gestionadas. Tocá cada captura para ver la evidencia.</p>
          </div>
          <div className="numbers" data-reveal>
            {results.map((r) => <div key={r.value}><b>{r.value}</b><span>{r.label}</span></div>)}
          </div>
          <div className="evidence" data-reveal>
            {evidence.map((e) => (
              <button key={e.src} onClick={() => setBox(e)} aria-label={`Ampliar: ${e.caption}`}>
                <img src={e.src} alt={e.caption} loading="lazy" />
                <span>{e.caption}</span>
              </button>
            ))}
          </div>
          <p className="note">Los resultados varían según la marca, el punto de partida y la constancia.</p>
        </div>
      </section>

      <section className="section light" id="servicios">
        <div className="wrap">
          <div className="head" data-reveal>
            <p className="label">02 · Servicios</p>
            <h2>Todo lo que tu marca necesita para <em>comunicar mejor.</em></h2>
            <p>No trabajo con fórmulas copiadas. Cada parte del proceso se piensa para tu marca.</p>
          </div>
          <div className="services">
            {services.map((s) => (
              <article className="service" key={s.n} data-reveal>
                <div className="serviceMedia">
                  {s.video ? <video autoPlay muted loop playsInline preload="metadata" style={{ objectPosition: s.pos }}><source src={`${s.video}#t=0.1`} type="video/mp4" /></video> : <img src={s.image} alt="" loading="lazy" style={{ objectPosition: s.pos }} />}
                </div>
                <div className="serviceBody">
                  <span className="num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.copy}</p>
                  <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="trabajos">
        <div className="wrap">
          <div className="head" data-reveal>
            <p className="label">03 · Trabajos seleccionados</p>
            <h2>Marcas reales, <em>trabajo que se ve.</em></h2>
          </div>

          <article className="case" data-reveal>
            <div className="caseInfo">
              <span className="num">Caso 01</span>
              <h3>Outlet Factory</h3>
              <p>Desarrollé la identidad completa de la marca: isotipo, paleta, tipografía y aplicaciones. Después la llevé a la calle con el cartel de la sucursal Varela, para que el local se reconozca igual que en Instagram.</p>
              <dl><div><dt>Alcance</dt><dd>Identidad y cartelería</dd></div><div><dt>Pieza destacada</dt><dd>Fachada sucursal Varela</dd></div></dl>
            </div>
            <div className="gallery outlet">
              {shot("/evidencias/outlet-identidad.webp", "Sistema de identidad de Outlet Factory", "Sistema de identidad visual de Outlet Factory", "wide")}
              {shot("/evidencias/outlet-aplicacion.webp", "Aplicaciones de marca de Outlet Factory", "Tarjetas con la marca Outlet Factory", "wide")}
              {[1, 2, 3].map((i) => <span key={i} className="cell">{shot(`/evidencias/outlet-varela-${i}.jpg`, "Cartel de Outlet Factory Varela", "Fachada de Outlet Factory Varela con el cartel nuevo", "tall")}</span>)}
            </div>
          </article>

          <article className="case flip" data-reveal>
            <div className="caseInfo">
              <span className="num">Caso 02</span>
              <h3>Dulce Manía</h3>
              <p>Ordené el perfil con una línea visual reconocible y contenido propio de la marca. El cambio se ve en la grilla y en cómo responde la gente.</p>
              <blockquote>“Se nota muchísimo el cambio y la gente responde cada vez más al contenido.”</blockquote>
            </div>
            <div className="gallery compare">
              <div className="cmp">{shot("/evidencias/dulce-antes.webp", "Dulce Manía, antes", "Perfil de Dulce Manía antes de la gestión")}<span className="tag">Antes</span></div>
              <div className="cmp">{shot("/evidencias/dulce-despues.webp", "Dulce Manía, después", "Perfil de Dulce Manía después de la gestión")}<span className="tag rose">Después</span></div>
            </div>
          </article>

          <article className="case" data-reveal>
            <div className="caseInfo">
              <span className="num">Caso 03</span>
              <h3>Jornadas de contenido</h3>
              <p>No me quedo detrás de una pantalla. Voy a cada negocio, conozco a sus personas y transformo lo que pasa todos los días en contenido cercano y auténtico.</p>
              <dl><div><dt>Formato</dt><dd>Foto, video y edición</dd></div><div><dt>Dónde</dt><dd>En tu local</dd></div></dl>
            </div>
            <div className="caseVideo">
              <video controls playsInline preload="metadata"><source src="/evidencias/contenido-clientes.mp4#t=0.5" type="video/mp4" /></video>
            </div>
          </article>
        </div>
      </section>

      <section className="section light" id="testimonios">
        <div className="wrap">
          <div className="head center" data-reveal>
            <p className="label">04 · Testimonios</p>
            <h2>Cuando el proceso funciona, <em>también se siente.</em></h2>
          </div>
          <div className="quotes">
            {testimonials.map((t) => (
              <figure key={t.name} data-reveal>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption><img src={t.logo} alt="" loading="lazy" className={t.wide ? "wide" : ""} /><span><b>{t.name}</b>Cliente activo</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="sobre-mi">
        <div className="wrap about">
          <div className="portrait" data-reveal><img src="/agostina-sobre-mi.webp" alt="Agostina Marghella, community manager y diseñadora visual" loading="lazy" /></div>
          <div className="aboutCopy" data-reveal>
            <p className="label">05 · Sobre mí</p>
            <h2>Detrás del estudio, <em>estoy yo.</em></h2>
            <p className="big">Soy Agostina, community manager, creadora de contenido y diseñadora visual. Estudio Diseño y Comunicación Visual en la Universidad Nacional de Lanús.</p>
            <p>Desde 2023 acompaño a marcas de distintos rubros. Pienso la estrategia, voy al lugar, grabo, saco fotos, edito, diseño y gestiono sus redes para que construyan identidad, generen confianza y conviertan seguidores en clientes.</p>
            <p className="tools"><span>Herramientas</span>Photoshop · Illustrator · InDesign · Lightroom · Figma · Canva</p>
          </div>
        </div>
        <div className="wrap stepsWrap">
          <div className="head" data-reveal>
            <p className="label">06 · Cómo trabajamos</p>
            <h2>Simple, cercano y <em>sin vueltas.</em></h2>
          </div>
          <ol className="steps">
            {steps.map(([t, c], i) => <li key={t} data-reveal><span>0{i + 1}</span><h3>{t}</h3><p>{c}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="section light" id="planes">
        <div className="wrap">
          <div className="head" data-reveal>
            <p className="label">07 · Planes</p>
            <h2>Un acompañamiento <em>a tu medida.</em></h2>
            <p>Valores mensuales. También hago campañas y jornadas de contenido puntuales.</p>
          </div>
          <div className="plans">
            {plans.map((p) => (
              <article key={p.name} className={`plan${p.featured ? " featured" : ""}`} data-reveal>
                {p.featured && <span className="badge">Más elegido</span>}
                <h3>{p.name}</h3>
                <div className="price">{p.old && <del>{p.old}</del>}<b>{p.price}</b><small>/ mes</small></div>
                <p>{p.copy}</p>
                <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <p className="ideal"><span>Ideal si</span>{p.ideal}</p>
                <a className={`btn${p.featured ? "" : " ghost"}`} href="#contacto" onClick={() => { setPlan(p.name); setSent(false); }}>Consultar <span>↗</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="diagnostico">
        <div className="wrap audit">
          <div className="auditIntro" data-reveal>
            <p className="label">08 · Diagnóstico gratuito</p>
            <h2>¿Tus redes están trabajando <em>para vos?</em></h2>
            <p>Respondé tres preguntas y recibí un primer diagnóstico orientativo. Te lleva menos de un minuto.</p>
          </div>
          <div className="auditCard" data-reveal>
            {!showResult || !result ? (
              <>
                {questions.map((q, qi) => (
                  <fieldset key={q.key}>
                    <legend><span>{qi + 1}</span>{q.title}</legend>
                    <div className="opts">
                      {q.options.map((o) => <button type="button" key={o} className={audit[q.key] === o ? "on" : ""} onClick={() => setAudit({ ...audit, [q.key]: o })}>{o}</button>)}
                    </div>
                  </fieldset>
                ))}
                <button className="btn full" disabled={!complete} onClick={() => setShowResult(true)}>Ver mi diagnóstico <span>↗</span></button>
              </>
            ) : (
              <div className="diagnosis">
                <p className="kicker">Tu diagnóstico · {result.level}</p>
                <h3>{result.title}</h3>
                <p>{result.copy}</p>
                <p className="tip"><b>Por dónde empezar.</b> {result.tip}</p>
                <p className="suggest">Plan sugerido: <b>{result.plan}</b></p>
                <a className="btn full" href={waLink(`¡Hola Agos! Hice el diagnóstico de tu web.\n• Frecuencia: ${audit.frequency}\n• Identidad visual: ${audit.identity}\n• Objetivo: ${audit.goal}\nMe sugirió el plan ${result.plan}. Me gustaría una mirada personalizada.`)} target="_blank" rel="noreferrer">Enviarle mi diagnóstico a Agos <span>↗</span></a>
                <button className="reset" onClick={() => { setShowResult(false); setAudit({ frequency: "", identity: "", goal: "" }); }}>Volver a responder</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section light" id="preguntas">
        <div className="wrap faq">
          <div className="head" data-reveal>
            <p className="label">09 · Preguntas frecuentes</p>
            <h2>Antes de <em>empezar.</em></h2>
          </div>
          <div className="faqList" data-reveal>
            {faqs.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true" /></summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="contact" id="contacto">
        <div className="wrap contactGrid">
          <div data-reveal>
            <p className="label">10 · Contacto</p>
            <h2>Hagamos que <em>tu marca se note.</em></h2>
            <p>Contame en qué etapa estás y vemos juntas cuál puede ser el próximo paso.</p>
            <div className="direct">
              <a href={waLink(HELLO)} target="_blank" rel="noreferrer">WhatsApp <span>↗</span></a>
              <a href="https://www.instagram.com/marghella.studio" target="_blank" rel="noreferrer">Instagram <span>↗</span></a>
              <a href="https://www.linkedin.com/in/agostina-marghella-14a100277" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
              <a href="mailto:agosmarghella@gmail.com">agosmarghella@gmail.com <span>↗</span></a>
            </div>
          </div>
          <div className="formCard" data-reveal>
            {sent ? (
              <div className="sent">
                <h3>¡Listo! Tu mensaje ya está en WhatsApp.</h3>
                <p>Solo falta que toques enviar. Si no se abrió la app, usá el botón.</p>
                <a className="btn" href={waLink("¡Hola Agos! Te escribo desde tu web.")} target="_blank" rel="noreferrer">Abrir WhatsApp <span>↗</span></a>
                <button className="reset" onClick={() => setSent(false)}>Escribir otra consulta</button>
              </div>
            ) : (
              <form onSubmit={sendForm}>
                <label>Nombre<input required name="nombre" autoComplete="name" placeholder="¿Cómo te llamás?" /></label>
                <label>Marca o negocio<input required name="marca" autoComplete="organization" placeholder="Contame qué hacés" /></label>
                <label className="full">Plan que te interesa
                  <select name="plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
                    <option value="">Todavía no sé, quiero asesoramiento</option>
                    {plans.map((p) => <option key={p.name} value={p.name}>{p.name} · {p.price} / mes</option>)}
                  </select>
                </label>
                <label className="full">¿En qué te puedo ayudar?<textarea required name="mensaje" placeholder="Contame brevemente qué necesitás" /></label>
                <button className="btn full" type="submit">Enviar por WhatsApp <span>↗</span></button>
                <small>Se abre WhatsApp con tu mensaje listo para enviar.</small>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footGrid">
          <a className="brand" href="#inicio"><img src="/logo-marghella-icon.png" alt="" /><span>Marghella<i>.studio</i></span></a>
          <nav aria-label="Pie de página">{nav.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</nav>
          <p>© {new Date().getFullYear()} Marghella Studio · Community manager y diseño visual</p>
        </div>
      </footer>

      <a className={`waFloat${showWa ? "" : " hide"}`} aria-hidden={!showWa} tabIndex={showWa ? 0 : -1} href={waLink(HELLO)} target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp">
        <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.2.6 4.4 1.7 6.3L3.2 29l7.3-1.9c1.8 1 3.9 1.5 5.9 1.5 7 0 12.7-5.7 12.7-12.7C29.1 8.7 23 3 16 3Zm0 23.3c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.3 1.1 1.1-4.2-.3-.4a10.4 10.4 0 0 1-1.6-5.6C5.1 9.9 10 5.2 16 5.2s10.9 4.7 10.9 10.6S21.9 26.3 16 26.3Zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.2 1.3 3.4c.2.2 2.3 3.6 5.7 5 2.8 1.1 3.4.9 4 .8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z" /></svg>
      </a>

      {box && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={box.caption} onClick={() => setBox(null)}>
          <button aria-label="Cerrar">×</button>
          <img src={box.src} alt={box.caption} onClick={(e) => e.stopPropagation()} />
          <p>{box.caption}</p>
        </div>
      )}
    </main>
  );
}
