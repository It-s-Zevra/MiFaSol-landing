"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CalendarClock, Clock, Instagram, Mail, MessageCircle, Minus, Plus, Quote, X } from "lucide-react";
import { usePrefill } from "@/lib/prefill-context";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { Sunflower, WhatsAppIcon } from "./icons";

const CONTACT_ENDPOINT =
  "https://mailer-backend-production-5f37.up.railway.app/api/v1/contact/mifasol";

const MAX_ATTEMPTS = 2;
const COOLDOWN_MS = 60 * 60 * 1000; // 1 hora
const STORAGE_KEY = "mifasol_form_attempts_v1";

function readAttempts(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "number") : [];
  } catch {
    return [];
  }
}

function saveAttempts(attempts: number[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
  } catch {
    // ignore quota / privacy mode errors
  }
}

const espacios = [
  "Jardín infantil",
  "Colegio",
  "Cafetería",
  "Cumpleaños",
  "Municipalidad",
  "Otro",
] as const;

const ageChips = ["2-3 años", "4-5 años", "6+ años"] as const;

const schema = z.object({
  nombre: z.string().min(2, "¿Cómo te llamas? Cuéntanos tu nombre 🌻"),
  whatsapp: z.string().min(8, "¿Nos compartes tu WhatsApp? Es la forma más rápida de coordinar."),
  email: z.string().email("Cuéntanos tu mejor email para enviarte la propuesta"),
  espacio: z
    .string()
    .refine((v) => (espacios as readonly string[]).includes(v), {
      message: "Cuéntanos qué tipo de espacio es 🌻",
    }),
  comuna: z.string().min(2, "Necesitamos saber dónde te ubicas 🌻"),
  cantidadNinos: z.coerce
    .number()
    .min(1, "Mínimo 1 niño")
    .max(200, "Máximo 200 niños"),
  edades: z.array(z.string()).optional(),
  fecha: z.string().optional(),
  mensaje: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-xl border-[1.5px] border-[#EAE3D2] bg-hueso px-4 py-3 text-cafe-700 placeholder:text-cafe-500 placeholder:opacity-60 focus:outline-none focus:border-girasol-500 focus:ring-4 focus:ring-girasol-500/15 transition";

export function ContactForm() {
  const { espacio: prefillEspacio } = usePrefill();
  const [success, setSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lockUntil, setLockUntil] = useState<number | null>(null);

  useEffect(() => {
    const now = Date.now();
    const fresh = readAttempts().filter((t) => now - t < COOLDOWN_MS);
    saveAttempts(fresh);
    if (fresh.length >= MAX_ATTEMPTS) {
      setLockUntil(fresh[0] + COOLDOWN_MS);
    }
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      cantidadNinos: 15,
      edades: [],
      espacio: "",
    },
  });

  useEffect(() => {
    if (prefillEspacio) {
      setValue("espacio", prefillEspacio, { shouldValidate: false });
    }
  }, [prefillEspacio, setValue]);

  const cantidad = Number(watch("cantidadNinos") ?? 15);
  const selectedAges = watch("edades") ?? [];

  function toggleAge(chip: string) {
    const next = selectedAges.includes(chip)
      ? selectedAges.filter((a) => a !== chip)
      : [...selectedAges, chip];
    setValue("edades", next, { shouldValidate: false });
  }

  async function onSubmit(values: FormValues) {
    setSubmitError(null);

    const payload = {
      nombre: values.nombre,
      whatsapp: values.whatsapp,
      email: values.email,
      espacio: values.espacio,
      comuna: values.comuna,
      cantidadNinos: String(values.cantidadNinos),
      edades: (values.edades ?? []).join(", "),
      fecha: "Por definir",
      mensaje: values.mensaje ?? "",
    };

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error(
            "Recibimos muchas solicitudes. Espera un minuto y vuelve a intentarlo, o escríbenos por WhatsApp.",
          );
        }
        if (res.status === 400) {
          throw new Error(
            "Algunos datos no son válidos. Revisa el formulario y vuelve a enviarlo.",
          );
        }
        throw new Error(
          "No pudimos enviar tu cotización. Intenta de nuevo o escríbenos por WhatsApp.",
        );
      }

      const now = Date.now();
      const fresh = readAttempts().filter((t) => now - t < COOLDOWN_MS);
      fresh.push(now);
      saveAttempts(fresh);
      if (fresh.length >= MAX_ATTEMPTS) {
        setLockUntil(fresh[0] + COOLDOWN_MS);
      }

      setSubmittedEmail(values.email);
      setSuccess(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "No pudimos enviar tu cotización. Intenta de nuevo o escríbenos por WhatsApp.",
      );
    }
  }

  function closeSuccess() {
    setSuccess(false);
    setSubmittedEmail("");
    reset({ cantidadNinos: 15, edades: [], espacio: "" });
  }

  return (
    <section id="cotizar" className="py-16 md:py-24 px-6 bg-crema">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* LEFT — copy + canales */}
        <div className="lg:col-span-5">
          <p className="text-[13px] uppercase tracking-widest font-medium text-cafe-500 mb-4">
            Cotización
          </p>
          <h2
            className="font-serif font-semibold text-cafe-700 leading-[1.1] mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Cuéntanos para quién y{" "}
            <span className="italic text-girasol-500">dónde.</span>
          </h2>
          <p className="text-[17px] text-cafe-700 opacity-80 mb-8">
            Te respondemos en menos de 24 horas con una propuesta personalizada para tu espacio.
          </p>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3">
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-girasol-100 shrink-0">
                <MessageCircle className="w-5 h-5 text-cafe-700" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-cafe-500">WhatsApp directo</p>
                <a
                  href={site.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-cafe-700 hover:text-girasol-600 transition"
                >
                  {site.whatsapp.display}
                </a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-girasol-100 shrink-0">
                <Mail className="w-5 h-5 text-cafe-700" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-cafe-500">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-cafe-700 hover:text-girasol-600 transition"
                >
                  {site.email}
                </a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-girasol-100 shrink-0">
                <Instagram className="w-5 h-5 text-cafe-700" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-cafe-500">Instagram</p>
                <a
                  href={site.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-cafe-700 hover:text-girasol-600 transition"
                >
                  {site.instagram.handle}
                </a>
              </div>
            </li>
          </ul>

          {/* Duo card */}
          <div className="bg-hueso rounded-2xl p-6 flex items-center gap-4 mt-8 shadow-soft">
            <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-girasol-100 relative">
              <Image
                src={images.duo}
                alt="Marcela y Stephanie"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-cafe-700">Marcela y Stephanie</p>
              <p className="text-sm text-cafe-500">Educadoras de párvulos · Fundadoras</p>
            </div>
          </div>

          {/* Decorative quote */}
          <div className="relative mt-8 pl-10">
            <Quote
              className="absolute left-0 top-0 w-7 h-7 text-girasol-500 -scale-x-100"
              fill="currentColor"
              strokeWidth={0}
            />
            <p className="font-serif italic text-[18px] text-cafe-500 leading-normal">
              Nos demoramos más eligiendo el cuento que tú llenando este formulario.
            </p>
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="lg:col-span-7">
          <div className="bg-hueso rounded-3xl p-6 md:p-8 border border-[#EAE3D2] shadow-soft">
            {lockUntil ? (
              <RateLimitedCard
                lockUntil={lockUntil}
                onUnlock={() => setLockUntil(null)}
              />
            ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              <div className="mb-2">
                <h3 className="font-serif font-semibold text-2xl text-cafe-700">
                  Solicita tu cotización
                </h3>
                <p className="text-sm text-cafe-500 mt-1">
                  Todos los campos con * son obligatorios
                </p>
              </div>

              <Field label="Nombre completo *" error={errors.nombre?.message}>
                <input
                  {...register("nombre")}
                  placeholder="¿Cómo te llamas?"
                  className={inputClass}
                  autoComplete="name"
                />
              </Field>

              <Field label="WhatsApp *" error={errors.whatsapp?.message}>
                <input
                  {...register("whatsapp")}
                  placeholder="+569 ..."
                  type="tel"
                  className={inputClass}
                  autoComplete="tel"
                />
              </Field>

              <Field label="Email *" error={errors.email?.message}>
                <input
                  {...register("email")}
                  placeholder="tu@email.com"
                  type="email"
                  className={inputClass}
                  autoComplete="email"
                />
              </Field>

              <Field label="Tipo de espacio *" error={errors.espacio?.message}>
                <select {...register("espacio")} className={inputClass}>
                  <option value="" disabled>
                    Selecciona el espacio
                  </option>
                  {espacios.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Comuna *" error={errors.comuna?.message}>
                <input
                  {...register("comuna")}
                  placeholder="¿En qué comuna?"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Cantidad de niños *"
                error={errors.cantidadNinos?.message}
              >
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Disminuir cantidad"
                    onClick={() =>
                      setValue("cantidadNinos", Math.max(1, cantidad - 1), {
                        shouldValidate: false,
                      })
                    }
                    className="inline-flex w-11 h-11 items-center justify-center rounded-xl border-[1.5px] border-[#EAE3D2] hover:border-girasol-500 transition"
                  >
                    <Minus className="w-4 h-4 text-cafe-700" />
                  </button>
                  <input
                    {...register("cantidadNinos", { valueAsNumber: true })}
                    type="number"
                    min={1}
                    max={200}
                    className={`${inputClass} text-center w-24`}
                  />
                  <button
                    type="button"
                    aria-label="Aumentar cantidad"
                    onClick={() =>
                      setValue("cantidadNinos", Math.min(200, cantidad + 1), {
                        shouldValidate: false,
                      })
                    }
                    className="inline-flex w-11 h-11 items-center justify-center rounded-xl border-[1.5px] border-[#EAE3D2] hover:border-girasol-500 transition"
                  >
                    <Plus className="w-4 h-4 text-cafe-700" />
                  </button>
                </div>
              </Field>

              <Field label="Edad de los niños">
                <div className="flex flex-wrap gap-2">
                  {ageChips.map((chip) => {
                    const active = selectedAges.includes(chip);
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => toggleAge(chip)}
                        aria-pressed={active}
                        className={
                          "px-4 py-2 rounded-full text-sm transition " +
                          (active
                            ? "bg-girasol-500 text-cafe-700 font-semibold"
                            : "bg-transparent border border-[#EAE3D2] text-cafe-700 hover:border-girasol-500")
                        }
                      >
                        {chip}
                      </button>
                    );
                  })}
                </div>
              </Field>

              <Field label="Fecha tentativa">
                <div
                  aria-disabled
                  className="flex items-center justify-between gap-3 rounded-xl border-[1.5px] border-dashed border-[#EAE3D2] bg-[#FBF7EC] px-4 py-3 text-cafe-500 cursor-not-allowed select-none"
                >
                  <span className="inline-flex items-center gap-2 text-sm">
                    <CalendarClock className="w-4 h-4 text-girasol-600" />
                    Reserva por calendario
                  </span>
                  <span className="inline-flex items-center rounded-full bg-girasol-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-cafe-700">
                    Próximamente
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-cafe-500 opacity-80">
                  Por ahora coordinamos la fecha contigo por WhatsApp o email.
                </p>
              </Field>

              <Field label="Cuéntanos un poco más">
                <textarea
                  {...register("mensaje")}
                  placeholder="Detalles del espacio, tema deseado, lo que sea relevante..."
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </Field>

              <div className="pt-2">
                {submitError && (
                  <div
                    role="alert"
                    className="mb-3 rounded-xl border border-[#E8B4B4] bg-[#FBECEC] px-4 py-3 text-sm text-[#9C3F3F]"
                  >
                    {submitError}{" "}
                    <a
                      href={site.whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline underline-offset-2"
                    >
                      Abrir WhatsApp
                    </a>
                  </div>
                )}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  initial="rest"
                  animate="rest"
                  whileHover={!isSubmitting ? "hover" : "rest"}
                  whileTap={!isSubmitting ? "tap" : "rest"}
                  variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.02 },
                    tap: { scale: 0.98 },
                  }}
                  className="group w-full rounded-full bg-girasol-500 py-4 px-6 font-semibold text-cafe-700 shadow-soft hover:shadow-soft-lg disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-3 transition-shadow"
                >
                  {isSubmitting ? "Enviando..." : "Enviar mi cotización"}
                  <motion.span
                    variants={{
                      rest: { rotate: 0 },
                      hover: { rotate: 360 },
                      tap: { rotate: 360 },
                    }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex"
                  >
                    <Sunflower className="w-5 h-5" />
                  </motion.span>
                </motion.button>
                <p className="mt-3 text-center text-xs text-cafe-500">
                  Sin compromiso · Te respondemos en menos de 24 horas
                </p>
              </div>
            </form>
            )}
          </div>
        </div>
      </div>

      <SuccessModal
        open={success}
        email={submittedEmail}
        onClose={closeSuccess}
      />
    </section>
  );
}

function RateLimitedCard({
  lockUntil,
  onUnlock,
}: {
  lockUntil: number;
  onUnlock: () => void;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remainingMs = Math.max(0, lockUntil - now);

  useEffect(() => {
    if (remainingMs === 0) onUnlock();
  }, [remainingMs, onUnlock]);

  const totalSeconds = Math.ceil(remainingMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-center py-4 md:py-6"
      aria-live="polite"
    >
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mx-auto w-20 h-20"
      >
        <Sunflower className="w-20 h-20" />
      </motion.div>

      <h3 className="mt-5 font-serif font-semibold text-[24px] md:text-[26px] text-cafe-700 leading-tight">
        Ya recibimos tus mensajes 🌻
      </h3>
      <p className="mt-2 text-[15px] text-cafe-700 opacity-80 max-w-md mx-auto leading-[1.6]">
        Para mantener todo ordenado y evitar mensajes duplicados, el formulario se
        reactivará automáticamente en:
      </p>

      <div className="mt-6 inline-flex items-end justify-center gap-2 rounded-2xl bg-girasol-100/70 px-6 py-4">
        <div className="flex items-baseline gap-1 font-serif">
          <span className="text-[44px] md:text-[52px] leading-none font-semibold text-cafe-700 tabular-nums">
            {mm}
          </span>
          <span className="text-[44px] md:text-[52px] leading-none font-semibold text-girasol-600">
            :
          </span>
          <span className="text-[44px] md:text-[52px] leading-none font-semibold text-cafe-700 tabular-nums">
            {ss}
          </span>
        </div>
      </div>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-cafe-500">
        min &nbsp;·&nbsp; seg
      </p>

      <div className="mt-7 rounded-2xl bg-[#FBF7EC] border border-[#EAE3D2] px-5 py-4 text-left">
        <p className="text-sm font-semibold text-cafe-700">
          ¿Necesitas escribirnos antes?
        </p>
        <p className="text-sm text-cafe-700 opacity-80 mt-1">
          Marcela y Stephanie ya están viendo tus mensajes. Si es urgente, contáctanos
          directo:
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-girasol-500 py-3 px-5 font-semibold text-cafe-700 shadow-soft hover:shadow-soft-lg transition-shadow"
          >
            <WhatsAppIcon className="w-5 h-5" />
            WhatsApp
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-[1.5px] border-cafe-700 py-3 px-5 font-semibold text-cafe-700 hover:bg-cafe-700 hover:text-hueso transition-colors"
          >
            <Mail className="w-5 h-5" />
            Email
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function SuccessModal({
  open,
  email,
  onClose,
}: {
  open: boolean;
  email: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="success-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          aria-modal="true"
          role="dialog"
          aria-labelledby="success-title"
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="absolute inset-0 bg-cafe-700/40 backdrop-blur-sm cursor-default"
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="relative w-full max-w-lg rounded-3xl bg-hueso p-7 md:p-9 shadow-soft-lg border border-[#EAE3D2]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-4 right-4 inline-flex w-9 h-9 items-center justify-center rounded-full text-cafe-500 hover:bg-girasol-100 hover:text-cafe-700 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="mx-auto w-24 h-24"
              >
                <Sunflower className="w-24 h-24" />
              </motion.div>
              <h3
                id="success-title"
                className="mt-5 font-serif font-semibold text-[26px] md:text-[28px] text-cafe-700 leading-tight"
              >
                ¡Cotización recibida! 🌻
              </h3>
              <p className="mt-3 text-[15px] text-cafe-700 opacity-85 max-w-md mx-auto leading-[1.6]">
                Marcela o Stephanie te van a escribir muy pronto con una propuesta personalizada
                para tu espacio.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="flex items-start gap-3 rounded-2xl bg-girasol-100/60 px-4 py-3">
                <Clock className="w-5 h-5 text-girasol-600 shrink-0 mt-0.5" />
                <div className="text-sm text-cafe-700">
                  <p className="font-semibold">Tiempo de respuesta</p>
                  <p className="opacity-80">
                    En menos de <strong>24 horas hábiles</strong> (lunes a viernes).
                  </p>
                </div>
              </div>

              {email && (
                <div className="flex items-start gap-3 rounded-2xl bg-[#FBF7EC] px-4 py-3">
                  <Mail className="w-5 h-5 text-girasol-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-cafe-700">
                    <p className="font-semibold">Te enviamos un correo de confirmación</p>
                    <p className="opacity-80">
                      A{" "}
                      <span className="font-medium text-cafe-700 break-all">{email}</span>. Si
                      no lo ves, revisa tu carpeta de <strong>spam</strong> o promociones.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 rounded-2xl bg-[#FBF7EC] px-4 py-3">
                <MessageCircle className="w-5 h-5 text-girasol-600 shrink-0 mt-0.5" />
                <div className="text-sm text-cafe-700">
                  <p className="font-semibold">¿Es urgente?</p>
                  <p className="opacity-80">
                    Escríbenos directo por WhatsApp y te respondemos al tiro.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-girasol-500 py-3 px-6 font-semibold text-cafe-700 shadow-soft hover:shadow-soft-lg transition-shadow"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Escribir por WhatsApp
              </a>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex flex-1 items-center justify-center rounded-full border-[1.5px] border-cafe-700 py-3 px-6 text-cafe-700 font-semibold hover:bg-cafe-700 hover:text-hueso transition-colors"
              >
                Listo
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-cafe-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-sm text-[#C97070]">{error}</p>}
    </div>
  );
}
