"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { images } from "@/lib/images";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={
          "fixed top-0 inset-x-0 z-40 transition-all duration-300 " +
          (scrolled
            ? "backdrop-blur-md bg-hueso/80 border-b border-cafe-700/5"
            : "bg-transparent")
        }
      >
        <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <a href="#hero" aria-label={site.name} className="inline-flex items-center">
            <Image
              src={images.logo}
              alt={site.name}
              width={200}
              height={200}
              priority
              className="h-10 w-auto object-contain"
            />
          </a>

          <ul className="hidden md:flex gap-8 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-cafe-500 hover:text-cafe-700 transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#cotizar"
            className="hidden md:inline-flex items-center rounded-full bg-girasol-500 px-5 py-2 text-sm font-semibold text-cafe-700 hover:bg-girasol-600 transition-colors"
          >
            Cotizar activación
          </a>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex w-10 h-10 items-center justify-center rounded-full text-cafe-700"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-cafe-700/30 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-hueso shadow-soft-lg md:hidden p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <Image
                  src={images.logo}
                  alt={site.name}
                  width={200}
                  height={200}
                  className="h-10 w-auto object-contain"
                />
                <button
                  type="button"
                  aria-label="Cerrar menú"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-10 h-10 items-center justify-center rounded-full text-cafe-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ul className="flex flex-col gap-4">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-lg font-medium text-cafe-700"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#cotizar"
                onClick={() => setOpen(false)}
                className="mt-auto inline-flex items-center justify-center rounded-full bg-girasol-500 px-6 py-3 font-semibold text-cafe-700"
              >
                Cotizar activación
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
