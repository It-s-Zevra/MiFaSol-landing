"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { images } from "@/lib/images";

const DURATION_MS = 2000;

export function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Siempre arrancar arriba: anula la restauración automática del browser
    // y fuerza el scroll a (0, 0) en cada carga.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => setShow(false), DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-100 bg-hueso flex items-center justify-center overflow-hidden"
          aria-busy="true"
          aria-live="polite"
          role="status"
        >
          {/* Background sun rays — slowly rotating */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15"
            aria-hidden
          >
            <svg
              viewBox="0 0 800 800"
              className="w-[110vmax] h-[110vmax]"
              preserveAspectRatio="xMidYMid meet"
            >
              {Array.from({ length: 24 }).map((_, i) => (
                <line
                  key={i}
                  x1="400"
                  y1="80"
                  x2="400"
                  y2="220"
                  stroke="var(--color-girasol-500)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  transform={`rotate(${i * 15} 400 400)`}
                />
              ))}
            </svg>
          </motion.div>

          {/* Soft glow */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: [1, 1.06, 1] }}
            transition={{
              opacity: { duration: 0.8 },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute w-88 h-88 rounded-full bg-girasol-100 opacity-70 blur-3xl"
          />

          {/* Petal ring + logo */}
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
            <motion.svg
              viewBox="0 0 200 200"
              animate={{ rotate: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-full h-full"
              aria-hidden
            >
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 360) / 12;
                return (
                  <motion.ellipse
                    key={i}
                    cx="100"
                    cy="22"
                    rx="7"
                    ry="16"
                    fill="var(--color-girasol-500)"
                    transform={`rotate(${angle} 100 100)`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.1 + i * 0.05,
                      duration: 0.4,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    style={{ transformOrigin: "100px 100px" }}
                  />
                );
              })}
            </motion.svg>

            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center"
            >
              <Image
                src={images.logo}
                alt="MiFaSol Girasol"
                width={300}
                height={300}
                priority
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
