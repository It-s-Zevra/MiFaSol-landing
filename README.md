# MiFaSol Girasol — Landing

Single-page de **MiFaSol Girasol**: cuenta cuentos, canciones y manualidades para niños en edad preescolar (Chile).

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 (theme tokens en [`app/globals.css`](app/globals.css))
- Framer Motion (animaciones)
- React Hook Form + Zod (formulario)
- next/font: Fraunces (serif) + Nunito (sans) + Caveat (handwriting)
- Imágenes vía Cloudinary con `next/image`

## Scripts
```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

## Estructura
```
app/
  layout.tsx         # fuentes + metadata SEO
  page.tsx           # composición de secciones
  globals.css        # tokens de paleta + animaciones
components/
  Navbar.tsx
  Hero.tsx           # §1 split 60/40 — pendiente
  WhatWeDo.tsx       # §2 cuento·canción·manos — pendiente
  ForWho.tsx         # §3 espacios y ocasiones — pendiente
  ContactForm.tsx    # §4 RHF + Zod — pendiente
  Footer.tsx
  WhatsAppFloat.tsx
lib/
  cn.ts              # helper clsx + tailwind-merge
  site.ts            # datos de contacto y nav
public/
  robots.txt
```

## Paleta (tokens en `globals.css`)
| Token | Hex | Uso |
|---|---|---|
| `--color-girasol-500` | `#FFC83D` | CTAs, acentos |
| `--color-girasol-100` | `#FFE89B` | fondos suaves, badges |
| `--color-cafe-700` | `#5C3A21` | textos principales, headlines |
| `--color-cafe-500` | `#A0673E` | textos secundarios |
| `--color-hueso` | `#FFFBF3` | fondo principal (NO blanco puro) |
| `--color-crema` | `#FFF6E0` | fondos alternos |
| `--color-petalo` | `#F4A8B8` | acento — máx 2 por sección |
| `--color-hoja` | `#8FB87F` | acento — máx 2 por sección |
| `--color-cielo` | `#B6D9E8` | acento — máx 2 por sección |

## Imágenes pendientes (Cloudinary)
`[LOGO_MIFASOL]`, `[LOGO_MIFASOL_NEGATIVO]`, `[FOTO_HERO]`, `[FOTO_DUO]`, `[ILUSTRACION_CUENTO]`, `[ILUSTRACION_CANCION]`, `[ILUSTRACION_MANUALIDAD]`, `[FOTO_JARDIN]`, `[FOTO_COLEGIO]`, `[FOTO_CAFE]`, `[FOTO_CUMPLE]`, `[FOTO_MUNI]`.
