"use client";

import { motion } from "framer-motion";

export function Sunflower({ className = "", spin = false }: { className?: string; spin?: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={spin ? { rotate: 360 } : undefined}
      transition={spin ? { duration: 20, repeat: Infinity, ease: "linear" } : undefined}
      aria-hidden
    >
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 360) / 12;
        return (
          <ellipse
            key={i}
            cx="32"
            cy="14"
            rx="4.5"
            ry="9"
            fill="#FFC83D"
            transform={`rotate(${angle} 32 32)`}
          />
        );
      })}
      <circle cx="32" cy="32" r="9" fill="#5C3A21" />
      <circle cx="32" cy="32" r="6" fill="#A0673E" />
    </motion.svg>
  );
}

export function HotAirBalloon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="32" cy="22" rx="16" ry="18" fill="#F4A8B8" />
      <path d="M22 36 L32 48 L42 36 Z" fill="#A0673E" opacity="0.5" />
      <rect x="26" y="46" width="12" height="8" rx="2" fill="#5C3A21" />
      <line x1="22" y1="36" x2="26" y2="46" stroke="#5C3A21" strokeWidth="1.2" />
      <line x1="42" y1="36" x2="38" y2="46" stroke="#5C3A21" strokeWidth="1.2" />
      <ellipse cx="26" cy="20" rx="2" ry="12" fill="#FFC83D" opacity="0.4" />
      <ellipse cx="38" cy="20" rx="2" ry="12" fill="#FFFBF3" opacity="0.4" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.336.671 4.516 1.834 6.366L4 29l7.83-1.769C13.602 28.387 14.778 28.5 16 28.5c6.627 0 12-5.373 12-12.5S22.628 3 16.001 3zm0 22.667c-1.13 0-2.247-.183-3.31-.547l-.39-.135-4.652 1.05 1.072-4.418-.157-.412c-.502-1.31-.764-2.737-.764-4.205 0-5.39 4.388-9.667 9.78-9.667 5.39 0 9.78 4.276 9.78 9.667 0 5.39-4.39 9.667-9.78 9.667zm5.564-7.196c-.305-.152-1.804-.89-2.083-.99-.279-.103-.482-.153-.685.152-.203.305-.787.99-.965 1.193-.178.203-.355.228-.66.076-.305-.152-1.288-.475-2.452-1.515-.906-.81-1.518-1.81-1.696-2.116-.178-.305-.019-.47.134-.622.137-.137.305-.355.457-.533.152-.178.203-.305.305-.508.102-.203.051-.381-.025-.533-.076-.152-.685-1.652-.94-2.262-.247-.594-.498-.514-.685-.523-.178-.009-.381-.011-.584-.011-.203 0-.533.076-.812.381-.279.305-1.066 1.04-1.066 2.54 0 1.5 1.092 2.948 1.244 3.151.152.203 2.149 3.281 5.205 4.602.728.314 1.296.502 1.74.643.731.232 1.395.199 1.92.121.586-.087 1.804-.737 2.06-1.45.255-.713.255-1.323.178-1.45-.076-.127-.279-.203-.584-.355z" />
    </svg>
  );
}
