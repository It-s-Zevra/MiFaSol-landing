"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { usePrefill } from "@/lib/prefill-context";
import { images } from "@/lib/images";

const cards = [
  {
    n: "01",
    title: "Jardines infantiles",
    description: "Activaciones que complementan tu programa pedagógico",
    espacio: "Jardín infantil",
    image: images.jardin,
    fallback: "var(--color-girasol-100)",
  },
  {
    n: "02",
    title: "Colegios",
    description: "Para celebraciones, día del libro, hitos del año",
    espacio: "Colegio",
    image: images.colegio,
    fallback: "var(--color-petalo)",
  },
  {
    n: "03",
    title: "Cafeterías",
    description: "Para tardes que las familias recordarán",
    espacio: "Cafetería",
    image: images.cafe,
    fallback: "var(--color-hoja)",
  },
  {
    n: "04",
    title: "Cumpleaños",
    description: "Una fiesta diferente: cuentos, canciones y manos creando",
    espacio: "Cumpleaños",
    image: images.cumple,
    fallback: "var(--color-girasol-500)",
  },
  {
    n: "05",
    title: "Municipalidades",
    description: "Activaciones culturales para tu comuna",
    espacio: "Municipalidad",
    image: images.muni,
    fallback: "var(--color-cielo)",
  },
] as const;

const stats = [
  { emoji: "🌻", value: 500, prefix: "+", label: "niños felices" },
  { emoji: "📚", value: 50, prefix: "+", label: "cuentos en repertorio" },
  { emoji: "🎓", value: 2, prefix: "", label: "educadoras de párvulos" },
];

export function ForWho() {
  const { setEspacio } = usePrefill();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  function pick(esp: string) {
    setEspacio(esp);
    document.getElementById("cotizar")?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToCard(idx: number) {
    const ref = carouselRef.current;
    const target = ref?.querySelector<HTMLElement>(`[data-card-idx="${idx}"]`);
    if (!ref || !target) return;
    const targetCenter = target.offsetLeft + target.offsetWidth / 2;
    ref.scrollTo({ left: targetCenter - ref.clientWidth / 2, behavior: "smooth" });
  }

  function goPrev() {
    scrollToCard(Math.max(0, activeIdx - 1));
  }
  function goNext() {
    scrollToCard(Math.min(cards.length - 1, activeIdx + 1));
  }

  useEffect(() => {
    const ref = carouselRef.current;
    if (!ref) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = Number(entry.target.getAttribute("data-card-idx"));
            if (!Number.isNaN(idx)) setActiveIdx(idx);
          }
        });
      },
      { root: ref, threshold: [0.6, 0.8, 1] }
    );
    ref.querySelectorAll("[data-card-idx]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="para-quien" className="py-16 md:py-24 px-6 bg-hueso">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mx-auto max-w-180 mb-12 md:mb-16"
        >
          <p className="text-[13px] uppercase tracking-widest font-medium text-cafe-500 mb-4">
            Llegamos donde nos llamen
          </p>
          <h2
            className="font-serif font-semibold text-cafe-700 leading-[1.1]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Para cada espacio donde haya niños y{" "}
            <span className="italic text-girasol-500">ganas de jugar.</span>
          </h2>
          <p className="mt-4 text-[17px] text-cafe-700 opacity-80">
            Adaptamos cada activación al espacio, al grupo y al momento.
          </p>
        </motion.div>

        {/* Carousel (mobile) / Grid (md+) */}
        <div
          ref={carouselRef}
          className="
            flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-6 px-6
            md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:mx-0 md:px-0
            lg:grid-cols-5
          "
        >
          {cards.map((card, i) => (
            <motion.button
              key={card.n}
              type="button"
              data-card-idx={i}
              onClick={() => pick(card.espacio)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="
                group flex flex-col bg-white rounded-2xl overflow-hidden text-left cursor-pointer
                border border-[#EAE3D2] shadow-soft hover:shadow-soft-lg
                transition-shadow duration-300
                w-72 shrink-0 snap-center md:w-auto md:shrink
              "
              aria-label={`Cotizar para ${card.espacio.toLowerCase()}`}
            >
              <div
                className="relative aspect-4/5 overflow-hidden"
                style={{ backgroundColor: card.fallback }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-girasol-600 tracking-widest">
                    {card.n}
                  </span>
                  <span className="h-px flex-1 bg-cafe-700/10" />
                </div>
                <h3 className="font-serif font-semibold text-lg text-cafe-700 mb-2 leading-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-cafe-700/75 leading-snug mb-4 flex-1">
                  {card.description}
                </p>
                <div className="flex items-center gap-1 text-cafe-700 font-semibold text-sm group-hover:text-girasol-600 transition-colors">
                  Cotizar
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Carousel controls — mobile only */}
        <div className="md:hidden mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={activeIdx === 0}
            aria-label="Espacio anterior"
            className="inline-flex w-10 h-10 items-center justify-center rounded-full border border-cafe-700/15 bg-white text-cafe-700 shadow-soft disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:border-girasol-500 enabled:hover:text-girasol-600 transition"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Navegación de espacios">
            {cards.map((card, i) => (
              <button
                key={card.n}
                type="button"
                role="tab"
                aria-selected={activeIdx === i}
                aria-label={`Ir a ${card.title}`}
                onClick={() => scrollToCard(i)}
                className={
                  "h-2 rounded-full transition-all duration-300 " +
                  (activeIdx === i
                    ? "w-8 bg-girasol-500"
                    : "w-2 bg-cafe-700/20 hover:bg-cafe-700/40")
                }
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={activeIdx === cards.length - 1}
            aria-label="Siguiente espacio"
            className="inline-flex w-10 h-10 items-center justify-center rounded-full border border-cafe-700/15 bg-white text-cafe-700 shadow-soft disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:border-girasol-500 enabled:hover:text-girasol-600 transition"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 md:mt-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={
                "flex flex-col items-center text-center px-8 " +
                (i > 0 ? "md:border-l md:border-[#EAE3D2]" : "")
              }
            >
              <span aria-hidden className="text-3xl mb-2">
                {stat.emoji}
              </span>
              <Counter value={stat.value} prefix={stat.prefix} />
              <span className="mt-1 text-xs uppercase tracking-widest text-cafe-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ value, prefix }: { value: number; prefix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1500;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-serif font-bold text-3xl text-cafe-700">
      {prefix}
      {n}
    </span>
  );
}
