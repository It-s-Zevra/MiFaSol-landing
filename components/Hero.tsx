"use client";

import { Fragment } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, GraduationCap, Music2, Star, Sun } from "lucide-react";
import { HotAirBalloon } from "./icons";
import { images } from "@/lib/images";

const headlineWords = [
  { text: "Cuentos", trailing: " " },
  { text: "que", trailing: " " },
  { text: "se", trailing: " " },
  { text: "cantan", trailing: ", ", special: true },
  { text: "momentos", trailing: " " },
  { text: "que", trailing: " " },
  { text: "se", trailing: " " },
  { text: "quedan.", trailing: "" },
];

const confetti = [
  { top: "16%", left: "4%", color: "var(--color-girasol-500)", size: 8, delay: "0s" },
  { top: "78%", left: "9%", color: "var(--color-petalo)", size: 6, delay: "1.5s" },
  { top: "22%", right: "22%", color: "var(--color-hoja)", size: 5, delay: "2.5s" },
  { top: "60%", right: "5%", color: "var(--color-cielo)", size: 7, delay: "3.5s" },
  { top: "48%", left: "46%", color: "var(--color-girasol-500)", size: 4, delay: "1s" },
  { top: "10%", right: "40%", color: "var(--color-petalo)", size: 4, delay: "2s" },
];

export function Hero() {
  const { scrollY } = useScroll();
  const yMusic = useTransform(scrollY, [0, 700], [0, -90]);
  const ySun = useTransform(scrollY, [0, 700], [0, -60]);
  const yBook = useTransform(scrollY, [0, 700], [0, -110]);
  const yStar = useTransform(scrollY, [0, 700], [0, -50]);
  const yBalloon = useTransform(scrollY, [0, 700], [0, -130]);

  function scrollToHowWeDoIt() {
    document.getElementById("que-hacemos")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="hero"
      className="relative pt-24 pb-20 md:py-32 px-6 overflow-hidden bg-hueso"
    >
      {/* Confetti dots — drifting in background */}
      {confetti.map((d, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute rounded-full pointer-events-none animate-float opacity-50 z-0"
          style={{
            top: d.top,
            left: d.left,
            right: d.right,
            width: d.size,
            height: d.size,
            backgroundColor: d.color,
            animationDelay: d.delay,
          }}
        />
      ))}

      {/* Floating decoratives w/ scroll parallax */}
      <motion.div
        initial={{ opacity: 0, rotate: -15 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={{ y: yMusic }}
        className="absolute top-32 left-4 md:left-24 animate-float z-10"
        aria-hidden
      >
        <Music2 className="w-7 h-7 md:w-8 md:h-8 text-girasol-500" strokeWidth={1.6} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: -15 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.65, duration: 0.6 }}
        style={{ y: ySun }}
        className="hidden md:block absolute top-44 left-1/2 -translate-x-1/2 animate-float z-10"
        aria-hidden
      >
        <Sun className="w-7 h-7 text-girasol-500" strokeWidth={1.6} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: -15 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{ y: yBook }}
        className="absolute top-28 right-4 md:right-12 animate-float z-10"
        aria-hidden
      >
        <BookOpen className="w-8 h-8 md:w-9 md:h-9 text-cafe-500" strokeWidth={1.4} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: -15 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.95, duration: 0.6 }}
        style={{ y: yStar }}
        className="absolute bottom-28 left-6 md:left-32 animate-float z-10"
        aria-hidden
      >
        <Star
          className="w-5 h-5 md:w-6 md:h-6 text-petalo"
          strokeWidth={1.6}
          fill="currentColor"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: -15 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        style={{ y: yBalloon }}
        className="hidden md:block absolute bottom-32 right-12 animate-float z-10"
        aria-hidden
      >
        <HotAirBalloon className="w-12 h-12" />
      </motion.div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[13px] uppercase tracking-widest font-medium text-cafe-500 mb-6"
            >
              Cuenta cuentos · Música · Actividades manuales
            </motion.p>

            <h1
              className="font-serif font-semibold text-cafe-700 leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {headlineWords.map((w, i) => (
                <Fragment key={i}>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                    className={
                      w.special
                        ? "relative inline-block italic text-girasol-500"
                        : "inline-block"
                    }
                  >
                    {w.text}
                    {w.special && (
                      <svg
                        viewBox="0 0 200 20"
                        preserveAspectRatio="none"
                        className="absolute -bottom-2 left-0 w-full h-3 pointer-events-none"
                        aria-hidden
                      >
                        <motion.path
                          d="M5 12 Q 50 4, 100 10 T 195 8"
                          stroke="var(--color-girasol-500)"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 1.5, duration: 1 }}
                        />
                      </svg>
                    )}
                  </motion.span>
                  {w.trailing}
                </Fragment>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-[17px] text-cafe-700 leading-relaxed max-w-135 mb-8"
            >
              Diseñadas para niños de 2 a 6 años por educadoras de párvulos profesionales.
              Llevamos los cuentos donde tú nos llames.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#cotizar"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="group inline-flex items-center gap-2 rounded-full bg-girasol-500 px-8 py-4 text-cafe-700 font-semibold shadow-soft hover:shadow-soft-lg transition-shadow"
              >
                Cotizar mi activación
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>

              <motion.button
                type="button"
                onClick={scrollToHowWeDoIt}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7, duration: 0.4 }}
                className="inline-flex items-center rounded-full border-[1.5px] border-cafe-700 px-8 py-4 text-cafe-700 font-semibold hover:bg-cafe-700 hover:text-hueso transition-colors"
              >
                Ver cómo lo hacemos
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="mt-8 flex items-center gap-2"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-girasol-100">
                <GraduationCap className="w-4 h-4 text-cafe-700" strokeWidth={2} />
              </span>
              <span className="text-[14px] font-medium text-cafe-500">
                Educadoras de párvulos certificadas
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT — visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="lg:col-span-5 relative w-full max-w-120 mx-auto aspect-4/5"
          >
            {/* halo blur — gentle pulse, behind everything */}
            <motion.div
              aria-hidden
              animate={{ scale: [1, 1.06, 1], opacity: [0.55, 0.7, 0.55] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-10 rounded-full bg-girasol-100 blur-3xl"
            />

            {/* Yellow morphing blob — backdrop only on the lower 78% so the
                photo's head & guitar overflow above it */}
            <motion.div
              aria-hidden
              animate={{ scale: [1, 1.03, 1], rotate: [0, 4, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-[4%] top-[22%] bottom-0 animate-morph bg-girasol-500 shadow-soft"
            />

            {/* Photo cutout — fills container, NO clip; transparent PNG
                lets the head + guitar pop above the yellow blob.
                mask-image fades the bottom (feet/jeans) into the background
                so the cutout doesn't end abruptly. */}
            <Image
              src={images.hero}
              alt="MiFaSol Girasol — cuenta cuentos en acción con niños"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              priority
              className="z-10 object-contain object-bottom"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, black 78%, transparent 98%)",
                maskImage:
                  "linear-gradient(to bottom, black 0%, black 78%, transparent 98%)",
              }}
            />

            {/* floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              whileHover={{ rotate: [-2, 2, -2, 0], transition: { duration: 0.5 } }}
              className="absolute -left-2 sm:-left-4 bottom-4 sm:bottom-8 z-20 rounded-2xl bg-hueso px-4 py-2 shadow-soft cursor-default"
            >
              <span className="text-sm font-medium text-cafe-700">🌻 +500 niños felices</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave bridging into the cream-bg next section */}
      <svg
        aria-hidden
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-20 z-0"
      >
        <path d="M0 40 Q 360 0, 720 40 T 1440 40 V80 H0 Z" fill="var(--color-crema)" />
      </svg>
    </section>
  );
}
