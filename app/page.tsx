"use client";
import { useEffect, useRef, useState } from "react";

const WHATSAPP = "5491162667127";
const waLink = (text: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
const HELLO = "¡Hola Agos! Vi la web de Marghella Studio y quiero consultarte por mis redes.";

const nav = [
  ["Servicios", "#servicios"],
  ["Resultados", "#resultados"],
  ["Trabajos", "#trabajos"],
  ["Planes", "#planes"],
  ["Sobre mí", "#sobre-mi"],
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
  { n: "01", title: "Gestión de redes", copy: "Planificamos, publicamos y hacemos el seguimiento. Tus redes con dirección, no solo con movimiento.", items: ["Calendario mensual", "Publicación de cada pieza", "Seguimiento y ajustes"] },
  { n: "02", title: "Producción en tu local", copy: "Vamos a tu negocio, grabamos y sacamos fotos de lo que pasa todos los días. Lo editamos y queda listo para publicar.", items: ["Jornadas de grabación", "Fotografía de producto y local", "Edición de reels"] },
  { n: "03", title: "Diseño e identidad", copy: "Piezas, carruseles e historias que se reconocen como tuyas. Si hace falta, también logo, paleta y cartelería.", items: ["Carruseles e historias", "Identidad de marca", "Piezas para el local"] },
  { n: "04", title: "Estrategia y métricas", copy: "Definimos qué querés lograr y miramos los números para decidir qué sostener y qué cambiar.", items: ["Objetivos y pilares", "Análisis mensual", "Decisiones con datos reales"] },
];

const steps = [
  ["Nos conocemos", "Charlamos sobre tu marca, tu público y lo que querés lograr."],
  ["Armamos el plan", "Definimos la estrategia y los contenidos del mes."],
  ["Grabamos y diseñamos", "Vamos a tu local, producimos y editamos cada pieza."],
  ["Medimos", "Revisamos qué funcionó para mejorar mes a mes."],
];

const results = [
  { value: "6,8 M", label: "visualizaciones en un solo reel" },
  { value: "2,6 M", label: "cuentas alcanzadas sin pauta" },
  { value: "+2.253%", label: "de crecimiento en un mes" },
  { value: "+1.422", label: "seguidores nuevos desde una pieza" },
];

const evidence = [
  { src: "/evidencias/reel-viral.webp", caption: "Reel con 6,8 M de visualizaciones" },
  { src: "/evidencias/metricas-marzo.webp", caption: "Marzo: 3,7 M de visualizaciones" },
  { src: "/evidencias/metricas-mayo.webp", caption: "Mayo: 491 mil visualizaciones" },
  { src: "/evidencias/metricas-julio.webp", caption: "Julio: 91% de alcance a no seguidores" },
];

const plans = [
  { name: "Esencial", copy: "Para ordenar tu comunicación y empezar a aparecer con constancia.", items: ["1 publicación semanal", "1 a 2 historias", "Edición", "Planificación"], ideal: "Publicás sin una frecuencia clara y necesitás una base profesional." },
  { name: "Crecimiento", copy: "Para delegar tus redes y trabajar el crecimiento en serio.", items: ["2 publicaciones semanales", "2 historias", "Producción de contenido", "Gestión y análisis mensual"], ideal: "Querés sostener una estrategia y medir qué contenido funciona." },
  { name: "Premium", copy: "Gestión integral para marcas que quieren más presencia.", items: ["3 publicaciones semanales", "3 historias", "2 visitas al negocio", "Reels, diseño y análisis"], ideal: "Tu marca necesita volumen de contenido y crecimiento sostenido.", featured: true },
  { name: "E-commerce", copy: "Todo el plan Premium, más una web propia para tu marca.", items: ["Todo el plan Premium", "Diseño de página web", "Servicios o catálogo", "Sitio adaptado a celulares"], ideal: "Además de redes, necesitás un espacio propio para vender o recibir consultas." },
];

const faqs = [
  ["¿Con qué tipo de negocios trabajan?", "Principalmente con comercios y marcas de zona sur: gastronomía, kioscos y dulcerías, heladerías, gimnasios, talleres, tiendas de hogar y servicios. Lo importante es que quieras construir un proceso."],
  ["¿Tengo que generar yo el contenido?", "No. Vamos a tu local a grabar y sacar fotos, y nos ocupamos del diseño, la edición y la publicación."],
  ["¿Cuánto tarda en verse un cambio?", "Ordenar la imagen del perfil se nota rápido; crecer y generar comunidad lleva constancia. No prometemos magia: trabajamos con objetivos que se pueden medir."],
  ["¿Puedo contratar algo puntual?", "Sí. También hacemos jornadas de contenido, lanzamientos o campañas puntuales sin contratar la gestión completa."],
  ["¿Cómo sé cuánto sale?", "Depende del plan y de lo que sumes o adaptes. Escribinos por WhatsApp, charlamos sobre tu negocio y te pasamos el presupuesto."],
];

const needs = [...plans.map((p) => `Plan ${p.name}`), "Gestión de TikTok", "Gestión de redes", "Producción de contenido en mi local", "Diseño o identidad de marca", "Una campaña o jornada puntual", "Todavía no sé, quiero asesoramiento"];

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg className={`sparkle ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 0c.9 7.4 3.6 10.6 12 12-8.4 1.4-11.1 4.6-12 12-.9-7.4-3.6-10.6-12-12C8.4 10.6 11.1 7.4 12 0Z" />
    </svg>
  );
}

function Oval({ className = "" }: { className?: string }) {
  return (
    <svg className={`oval ${className}`} viewBox="0 0 320 110" aria-hidden="true" preserveAspectRatio="none">
      <path d="M58 92C18 80 10 52 62 32 124 8 250 8 296 34c34 20 6 52-52 64-74 15-178 12-214-14C8 66 30 40 84 26" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`arrow ${className}`} viewBox="0 0 100 80" aria-hidden="true">
      <path d="M8 6c6 34 30 58 78 54M72 48l14 12-13 12" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [box, setBox] = useState<{ src: string; caption: string } | null>(null);
  const [sent, setSent] = useState(false);
  const [need, setNeed] = useState("");
  const [ready, setReady] = useState(false);
  const [showWa, setShowWa] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const pauseLogos = useRef<(ms?: number) => void>(() => {});

  useEffect(() => {
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

  const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const need = d.get("necesidad");
    const text = `¡Hola Agos! Soy ${d.get("nombre")}, de ${d.get("marca")}.\n${need ? `Me interesa: ${need}.\n` : ""}\n${d.get("mensaje")}`;
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
        <a className="brand" href="#inicio" aria-label="Marghella Studio, inicio">Marghella Studio</a>
        <nav className="navLinks" aria-label="Secciones">
          {nav.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <a className="btn small navCta" href="#contacto">Hablemos</a>
        <button className="menuBtn" onClick={() => setMenu(true)} aria-label="Abrir menú" aria-expanded={menu}><span /><span /></button>
      </header>

      <div className={`menu${menu ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Menú" aria-hidden={!menu}>
        <button className="menuClose" onClick={() => setMenu(false)} aria-label="Cerrar menú">×</button>
        <nav onClick={() => setMenu(false)}>
          {nav.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="btn" href={waLink(HELLO)} target="_blank" rel="noreferrer">Escribinos por WhatsApp</a>
      </div>

      {/* ───────── HERO ───────── */}
      <section className="hero" id="inicio">
        <div className="wrap heroGrid">
          <div className="heroCopy">
            <p className="pill">Redes · Contenido · Diseño</p>
            <h1>
              <span className="h1Top">Hacemos crecer</span>
              <span className="script">tu marca<Oval /></span>
            </h1>
            <p className="lead">Contenido real, grabado en tu local, para que la gente quiera visitarlo. Estrategia, producción y diseño para comercios de zona sur.</p>
            <div className="actions">
              <a className="btn" href={waLink(HELLO)} target="_blank" rel="noreferrer">Escribinos por WhatsApp</a>
              <a className="link" href="#trabajos">Ver trabajos <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className="heroArt">
            <Sparkle className="s1" />
            <Sparkle className="s2" />
            <div className="heroVideo">
              <video autoPlay muted loop playsInline preload="auto" poster="/marghella-en-accion.jpg" aria-label="Marghella Studio grabando contenido en un restaurante">
                <source src="/marghella-en-accion.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="sticker"><Sparkle />En acción, grabando en el local</p>
            <Arrow className="heroArrow" />
          </div>
        </div>
        <div className="wrap"><div className="heroStats">
          <div><b>6,8 M</b><span>visualizaciones en un reel</span></div>
          <div><b>+2.253%</b><span>crecimiento en un mes</span></div>
          <div><b>+11</b><span>marcas gestionadas</span></div>
          <div><b>2023</b><span>creando contenido</span></div>
        </div></div>
      </section>

      {/* ───────── CLIENTES ───────── */}
      <section className="clients" aria-label="Clientes">
        <p className="label center">Marcas que confían en nosotras</p>
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
          <span>Tocá un logo para ver su Instagram</span>
          <button onClick={() => slideLogos(1)} aria-label="Ver más logos">→</button>
        </div>
      </section>

      {/* ───────── SERVICIOS ───────── */}
      <section className="section rosa" id="servicios">
        <div className="wrap">
          <div className="head" data-reveal>
            <p className="label">Qué hacemos</p>
            <h2>Todo lo que tu marca necesita <span className="script">en un solo lugar</span></h2>
          </div>
          <div className="services">
            {services.map((s) => (
              <article className="service" key={s.n} data-reveal>
                <span className="num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
                <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </article>
            ))}
          </div>

          <div className="process" data-reveal>
            <p className="label">Cómo trabajamos</p>
            <ol className="steps">
              {steps.map(([t, c], i) => <li key={t}><span>{i + 1}</span><h3>{t}</h3><p>{c}</p></li>)}
            </ol>
          </div>
        </div>
      </section>

      {/* ───────── RESULTADOS ───────── */}
      <section className="section vino" id="resultados">
        <Sparkle className="deco d1" />
        <div className="wrap">
          <div className="head" data-reveal>
            <p className="label">Resultados</p>
            <h2>Números reales <span className="script">que se notan</span></h2>
            <p className="intro">Capturas de las estadísticas de cuentas que gestionamos. Tocá cada una para verla completa.</p>
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

      {/* ───────── TRABAJOS ───────── */}
      <section className="section rosa" id="trabajos">
        <div className="wrap">
          <div className="head" data-reveal>
            <p className="label">Trabajos</p>
            <h2>Marcas reales, <span className="script">trabajo que se ve</span></h2>
          </div>

          <article className="case" data-reveal>
            <div className="caseInfo">
              <p className="pill">Dulce Manía · Adrogué</p>
              <h3>Un perfil que da ganas de visitar</h3>
              <p>Ordenamos la cuenta con una línea visual reconocible y contenido grabado en el local. El cambio se ve en la grilla y en cómo responde la gente.</p>
              <dl>
                <div><dt>Antes</dt><dd>1.834 seguidores</dd></div>
                <div><dt>Después</dt><dd>6.172 seguidores</dd></div>
              </dl>
            </div>
            <div className="compare">
              <div className="cmp">{shot("/evidencias/dulce-antes.webp", "Dulce Manía, antes", "Perfil de Dulce Manía antes de la gestión")}<span className="tag">Antes</span></div>
              <div className="cmp">{shot("/evidencias/dulce-despues.webp", "Dulce Manía, después", "Perfil de Dulce Manía después de la gestión")}<span className="tag on">Después</span></div>
            </div>
          </article>

          <article className="case flip" data-reveal>
            <div className="caseInfo">
              <p className="pill">Autopartes El Emporio · Monte Grande</p>
              <h3>Grabamos donde pasan las cosas</h3>
              <p>Vamos al local, grabamos con la gente del lugar y lo convertimos en reels claros y comerciales, listos para publicar.</p>
              <dl>
                <div><dt>Formato</dt><dd>Reels</dd></div>
                <div><dt>Dónde</dt><dd>En el local</dd></div>
              </dl>
            </div>
            <div className="caseVideo">
              <video autoPlay muted loop playsInline controls preload="metadata"><source src="/evidencias/produccion.mp4#t=0.1" type="video/mp4" /></video>
            </div>
          </article>

        </div>
      </section>

      {/* ───────── SOBRE MÍ ───────── */}
      <section className="section vino" id="sobre-mi">
        <div className="wrap about">
          <div className="portrait" data-reveal>
            <img src="/agostina-sobre-mi.webp" alt="Agostina Marghella, fundadora de Marghella Studio" loading="lazy" />
            <Sparkle className="ps" />
          </div>
          <div className="aboutCopy" data-reveal>
            <p className="label">Sobre mí</p>
            <h2>Detrás del estudio <span className="script">estoy yo</span></h2>
            <p className="big">Soy Agostina Marghella, community manager, creadora de contenido y diseñadora. Estudio Diseño y Comunicación Visual en la Universidad Nacional de Lanús.</p>
            <p>Desde 2023 acompaño a comercios de zona sur. Pensamos la estrategia, vamos al local, grabamos, editamos, diseñamos y gestionamos sus redes para que la gente los conozca, les tenga confianza y los elija.</p>
            <p className="tools"><span>Herramientas</span>Illustrator · InDesign · Photoshop · Lightroom · Figma · Canva · CapCut</p>
          </div>
        </div>
      </section>

      {/* ───────── PLANES ───────── */}
      <section className="section rosa" id="planes">
        <div className="wrap">
          <div className="head" data-reveal>
            <p className="label">Planes</p>
            <h2>Un plan para cada <span className="script">etapa de tu marca</span></h2>
            <p className="intro">Elegí el punto de partida. Los valores te los pasamos por WhatsApp según lo que necesite tu negocio.</p>
          </div>
          <div className="plans">
            {plans.map((p) => (
              <article key={p.name} className={`plan${p.featured ? " featured" : ""}`} data-reveal>
                {p.featured && <span className="badge">Más elegido</span>}
                <h3>{p.name}</h3>
                <p>{p.copy}</p>
                <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <p className="ideal"><span>Ideal si</span>{p.ideal}</p>
                <a className="btn" href="#contacto" onClick={() => { setNeed(`Plan ${p.name}`); setSent(false); }}>Consultar</a>
              </article>
            ))}
          </div>
          <div className="extras" data-reveal>
            <div><Sparkle /><p><b>Planes a tu medida.</b> Cada plan se puede modificar: sumamos o cambiamos lo que tu negocio necesite, con un costo adicional.</p></div>
            <div><Sparkle /><p><b>TikTok aparte.</b> También gestionamos tu cuenta de TikTok, como servicio adicional a cualquier plan.</p></div>
          </div>

          <div className="faq" id="preguntas">
            <div className="head" data-reveal>
              <p className="label">Preguntas frecuentes</p>
              <h2>Antes de <span className="script">empezar</span></h2>
            </div>
            <div className="faqList" data-reveal>
              {faqs.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true" /></summary><p>{a}</p></details>)}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── CONTACTO ───────── */}
      <section className="contact vino" id="contacto">
        <Sparkle className="deco d2" />
        <div className="wrap contactGrid">
          <div data-reveal>
            <p className="label">Contacto</p>
            <h2>Hagamos que <span className="script">tu marca se note</span></h2>
            <p className="intro">Contanos en qué etapa estás y te armamos una propuesta a medida.</p>
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
                <a className="btn" href={waLink("¡Hola Agos! Te escribo desde la web.")} target="_blank" rel="noreferrer">Abrir WhatsApp</a>
                <button className="reset" onClick={() => setSent(false)}>Escribir otra consulta</button>
              </div>
            ) : (
              <form onSubmit={sendForm}>
                <label>Nombre<input required name="nombre" autoComplete="name" placeholder="¿Cómo te llamás?" /></label>
                <label>Marca o negocio<input required name="marca" autoComplete="organization" placeholder="Nombre de tu negocio" /></label>
                <label className="full">¿Qué necesitás?
                  <select name="necesidad" value={need} onChange={(e) => setNeed(e.target.value)}>
                    <option value="">Elegí una opción</option>
                    {needs.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </label>
                <label className="full">Contanos un poco más<textarea required name="mensaje" placeholder="¿Qué te gustaría lograr con tus redes?" /></label>
                <button className="btn full" type="submit">Enviar por WhatsApp</button>
                <small>Se abre WhatsApp con tu mensaje listo para enviar.</small>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footGrid">
          <a className="brand" href="#inicio">Marghella Studio</a>
          <nav aria-label="Pie de página">{nav.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</nav>
          <p>© {new Date().getFullYear()} Marghella Studio · Zona sur, Buenos Aires</p>
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
