import type { Metadata } from "next";
import { Fraunces, Nunito, Caveat } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MiFaSol Girasol — Cuenta cuentos y activaciones para niños en Chile",
  description:
    "Activaciones lúdicas con cuentos, canciones y manualidades para niños en edad preescolar. Educadoras de párvulos profesionales en Chile.",
  metadataBase: new URL("https://mifasolgirasol.cl"),
  openGraph: {
    title: "MiFaSol Girasol — Cuentos que se cantan, momentos que se quedan",
    description:
      "Activaciones lúdicas con cuentos, canciones y manualidades para niños en edad preescolar.",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" className={`${fraunces.variable} ${nunito.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
