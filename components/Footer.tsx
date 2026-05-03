import Image from "next/image";
import { site } from "@/lib/site";
import { images } from "@/lib/images";

export function Footer() {
  return (
    <footer className="bg-cafe-700 text-hueso py-16 px-6">
      <div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-3">
        <div>
          <Image
            src={images.logoNegative}
            alt={site.name}
            width={220}
            height={220}
            className="h-14 w-auto object-contain"
          />
          <p className="mt-4 text-sm opacity-80">{site.tagline}</p>
        </div>
        <ul className="flex flex-col gap-2 text-sm md:items-center">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="opacity-80 hover:opacity-100 transition">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 text-sm md:items-end">
          <a
            href={site.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100 transition"
          >
            Instagram {site.instagram.handle}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="opacity-80 hover:opacity-100 transition"
          >
            {site.email}
          </a>
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100 transition"
          >
            {site.whatsapp.display}
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-7xl mt-10 pt-6 border-t border-hueso/15 flex flex-col md:flex-row md:justify-between gap-2 text-xs opacity-60 text-center md:text-left">
        <p>Hecho con cariño en Chile 🇨🇱</p>
        <p>
          © {new Date().getFullYear()} {site.name} — Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
