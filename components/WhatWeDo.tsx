"use client";

import { motion } from "framer-motion";
import { BookOpen, Music2, Scissors } from "lucide-react";
import { Sunflower } from "./icons";

const cards = [
  {
    icon: BookOpen,
    color: "var(--color-girasol-500)",
    title: "Contamos el cuento",
    description:
      "Elegimos relatos que despiertan asombro, abrazan emociones y siembran preguntas. Literatura infantil escogida con cariño y criterio.",
    hoverAnim: { rotate: [0, -3, 3, -3, 0] },
  },
  {
    icon: Music2,
    color: "var(--color-petalo)",
    title: "Cantamos juntos",
    description:
      "Las canciones convierten el cuento en cuerpo. Los niños se mueven, repiten, ríen y aprenden sin darse cuenta.",
    hoverAnim: { y: [0, -4, 0, -4, 0] },
  },
  {
    icon: Scissors,
    color: "var(--color-hoja)",
    title: "Creamos con las manos",
    description:
      "Cerramos cada activación con una manualidad ligada a la historia. Se llevan a casa algo hecho por ellos — y un recuerdo que dura.",
    hoverAnim: { rotate: [0, 15, -15, 15, 0] },
  },
];

export function WhatWeDo() {
  return (
    <section id="que-hacemos" className="relative py-16 md:py-24 px-6 bg-crema">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mx-auto max-w-180 mb-16"
        >
          <p className="text-[13px] uppercase tracking-widest font-medium text-cafe-500 mb-4">
            Nuestra metodología
          </p>
          <h2
            className="font-serif font-semibold text-cafe-700 leading-[1.1]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Tres ingredientes, una experiencia{" "}
            <span className="italic text-girasol-500">mágica.</span>
          </h2>
          <p className="mt-4 text-[17px] text-cafe-700 opacity-80">
            Cada activación combina estos tres momentos para que los niños vivan, no solo escuchen.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                className="group bg-hueso rounded-3xl p-6 md:p-8 border border-[#EAE3D2] shadow-soft hover:shadow-soft-lg transition-shadow"
              >
                <motion.div
                  whileHover={card.hoverAnim}
                  transition={{ duration: 0.6 }}
                  className="mb-6 inline-block"
                >
                  <Icon className="w-14 h-14 md:w-16 md:h-16" color={card.color} strokeWidth={1.6} />
                </motion.div>
                <h3 className="font-serif font-semibold text-2xl text-cafe-700 mb-3">
                  {card.title}
                </h3>
                <p className="text-base text-cafe-700 opacity-85 leading-[1.6]">
                  {card.description}
                </p>
                <div
                  className="mt-6 h-1 w-12 rounded-full"
                  style={{ backgroundColor: card.color }}
                />
              </motion.article>
            );
          })}
        </div>

        {/* Differentiator banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative mt-16 md:mt-20 mx-auto max-w-275 bg-cafe-700 rounded-3xl p-8 md:p-12 text-center overflow-hidden"
        >
          <div className="absolute top-4 left-4 opacity-15 pointer-events-none">
            <Sunflower className="w-16 h-16" spin />
          </div>
          <div className="absolute bottom-4 right-4 opacity-15 pointer-events-none">
            <Sunflower className="w-20 h-20" spin />
          </div>
          <div className="hidden md:block absolute top-1/2 -right-6 -translate-y-1/2 opacity-10 pointer-events-none">
            <Sunflower className="w-12 h-12" spin />
          </div>

          <p
            className="relative font-serif italic font-medium text-hueso leading-[1.4]"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
          >
            Somos educadoras de párvulos. Sabemos exactamente qué pasa en la cabeza de un niño de 3
            años — y qué necesita para{" "}
            <span className="text-girasol-500 underline decoration-girasol-500 underline-offset-4">
              florecer.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
