"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WhatsAppIcon } from "./icons";
import { site } from "@/lib/site";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: [1, 1.1, 1, 1.1, 1],
          }}
          exit={{ opacity: 0, y: 100 }}
          transition={{
            opacity: { duration: 0.5 },
            y: { duration: 0.5 },
            scale: {
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 4.4,
              ease: "easeInOut",
            },
          }}
          className="fixed bottom-6 right-6 z-50"
        >
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hablemos por WhatsApp"
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => setShowTip(false)}
            className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl hover:scale-110 transition-transform"
          >
            <WhatsAppIcon className="w-7 h-7 text-white" />

            <AnimatePresence>
              {showTip && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="absolute right-full mr-3 whitespace-nowrap rounded-full bg-cafe-700 px-4 py-2 text-sm font-medium text-hueso shadow-soft"
                >
                  Hablemos por WhatsApp 💬
                </motion.span>
              )}
            </AnimatePresence>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
