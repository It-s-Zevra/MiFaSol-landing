"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Mail, Minus, Plus, MessageCircle, Quote } from "lucide-react";
import { usePrefill } from "@/lib/prefill-context";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { Sunflower } from "./icons";

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
    // TODO: Conectar a Resend / EmailJS / webhook WhatsApp
    console.log("[MiFaSol] cotización:", values);
    await new Promise((r) => setTimeout(r, 1500));
    setSuccess(true);
  }

  function reopenForm() {
    setSuccess(false);
    reset({ cantidadNinos: 15, edades: [], espacio: "" });
  }

  const today = new Date().toISOString().slice(0, 10);

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
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8 md:py-12"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mx-auto w-32 h-32"
                  >
                    <Sunflower className="w-32 h-32" />
                  </motion.div>
                  <h3 className="mt-6 font-serif font-semibold text-[28px] text-cafe-700">
                    ¡Mensaje recibido!
                  </h3>
                  <p className="mt-3 text-base text-cafe-700 opacity-85 max-w-md mx-auto leading-[1.6]">
                    Marcela o Stephanie te escribirán pronto. Mientras tanto, estírate y respira —
                    ya estamos entrando en órbita 🌻
                  </p>
                  <button
                    type="button"
                    onClick={reopenForm}
                    className="mt-8 inline-flex items-center rounded-full border-[1.5px] border-cafe-700 px-6 py-3 text-cafe-700 font-semibold hover:bg-cafe-700 hover:text-hueso transition-colors"
                  >
                    Volver al formulario
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
                    <input
                      {...register("fecha")}
                      type="date"
                      min={today}
                      className={inputClass}
                    />
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
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
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
