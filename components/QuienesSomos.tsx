"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Music2, Sparkles } from "lucide-react";
import { Sunflower } from "./icons";
import { images } from "@/lib/images";

const people = [
  {
    name: "Marce",
    role: "Educadora de párvulos",
    image: images.marce,
    accent: "var(--color-petalo)",
    accentBg: "bg-[var(--color-petalo)]/15",
    icon: BookOpen,
    tags: ["Montessori", "Literatura infantil", "Vínculo familiar"],
    bio: "Educadora de párvulos con formación complementaria en enfoque Montessori y literatura infantil. Apasionada por crear experiencias sensibles y significativas para la infancia, integrando juego, música, narración y vínculo familiar.",
    align: "left" as const,
  },
  {
    name: "Stephy",
    role: "Educadora de párvulos · Música",
    image: images.stephy,
    accent: "var(--color-hoja)",
    accentBg: "bg-[var(--color-hoja)]/15",
    icon: Music2,
    tags: ["Canto", "Música infantil", "Creatividad"],
    bio: "Educadora de Párvulos, ligada a la música desde edad temprana, especialmente en canto. Hoy pone su trayectoria artística para entregar experiencias musicales cercanas y creativas a los niños y familias, entendiendo que el contacto con la música desde el inicio ayuda al desarrollo del lenguaje, la creatividad y fortalece habilidades sociales al momento de jugar y aprender.",
    align: "right" as const,
  },
];

export function QuienesSomos() {
  return (
    <section
      id="quienes-somos"
      className="relative py-16 md:py-24 px-6 bg-hueso overflow-hidden"
    >
      {/* Sunflower decoratives */}
      <div className="absolute top-12 left-6 md:left-12 opacity-10 pointer-events-none">
        <Sunflower className="w-20 h-20" spin />
      </div>
      <div className="absolute bottom-12 right-6 md:right-12 opacity-10 pointer-events-none">
        <Sunflower className="w-24 h-24" spin />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mx-auto max-w-180 mb-12 md:mb-20"
        >
          <p className="text-[13px] uppercase tracking-widest font-medium text-cafe-500 mb-4">
            Nuestro equipo
          </p>
          <h2
            className="font-serif font-semibold text-cafe-700 leading-[1.1]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Las manos y la voz detrás de{" "}
            <span className="italic text-girasol-500">cada cuento.</span>
          </h2>
          <p className="mt-4 text-[17px] text-cafe-700 opacity-80">
            Dos educadoras de párvulos que se conocieron por el amor a la infancia, los
            libros y la música.
          </p>
        </motion.div>

        {/* People */}
        <div className="space-y-16 md:space-y-24">
          {people.map((p, i) => {
            const Icon = p.icon;
            const photoOrder =
              p.align === "left" ? "md:order-1" : "md:order-2";
            const textOrder =
              p.align === "left" ? "md:order-2" : "md:order-1";

            return (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-12"
              >
                {/* Photo column */}
                <div
                  className={
                    "relative md:col-span-5 mx-auto w-full max-w-md aspect-4/5 " +
                    photoOrder
                  }
                >
                  {/* halo */}
                  <motion.div
                    aria-hidden
                    animate={{
                      scale: [1, 1.04, 1],
                      opacity: [0.45, 0.6, 0.45],
                    }}
                    transition={{
                      duration: 9,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -inset-6 rounded-full bg-girasol-100 blur-3xl"
                  />

                  {/* morphing blob */}
                  <motion.div
                    aria-hidden
                    animate={{ rotate: [0, 3, 0, -3, 0] }}
                    transition={{
                      duration: 14,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 animate-morph shadow-soft"
                    style={{ backgroundColor: p.accent }}
                  />

                  {/* photo */}
                  <div className="absolute inset-2 rounded-[3rem] overflow-hidden bg-hueso shadow-soft animate-morph">
                    <Image
                      src={p.image}
                      alt={`${p.name} — ${p.role}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      className="object-cover"
                    />
                  </div>

                  {/* floating tag */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="absolute -bottom-3 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-hueso px-4 py-2 shadow-soft"
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: p.accent }}
                      strokeWidth={2}
                    />
                    <span className="text-sm font-semibold text-cafe-700">
                      {p.name}
                    </span>
                  </motion.div>
                </div>

                {/* Text column */}
                <div className={"md:col-span-7 " + textOrder}>
                  <span
                    className={
                      "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] uppercase tracking-widest font-medium text-cafe-700 mb-4 " +
                      p.accentBg
                    }
                  >
                    <Sparkles
                      className="w-3.5 h-3.5"
                      style={{ color: p.accent }}
                      strokeWidth={2}
                    />
                    {p.role}
                  </span>
                  <h3
                    className="font-serif font-semibold text-cafe-700 leading-[1.1] mb-5"
                    style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                  >
                    {p.name}
                  </h3>
                  <p className="text-[17px] text-cafe-700 leading-[1.7] opacity-90 mb-6">
                    {p.bio}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <li
                        key={tag}
                        className="inline-flex items-center rounded-full border border-[#EAE3D2] bg-hueso px-3.5 py-1.5 text-sm font-medium text-cafe-700"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-24 text-center"
        >
          <a
            href="#cotizar"
            className="inline-flex items-center gap-2 rounded-full bg-girasol-500 px-7 py-3.5 font-semibold text-cafe-700 shadow-soft hover:shadow-soft-lg transition-shadow"
          >
            Trabaja con nosotras
          </a>
        </motion.div>
      </div>
    </section>
  );
}
