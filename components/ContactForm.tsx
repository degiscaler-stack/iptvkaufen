"use client";

import { useId, useState, type FormEvent } from "react";
import { FaCheckCircle } from "react-icons/fa";
import {
  validateContactForm,
  type ContactFieldErrors,
} from "@/lib/contact-form";
import { ctaSolidGreenClass } from "@/lib/cta-motion";

const fieldClassName =
  "contact-form-field mt-2 w-full rounded-xl border border-[rgba(166,255,0,0.4)] bg-[#0A0E0A] px-4 text-[14px] text-[#F5F5F5] outline-none transition duration-300 placeholder:text-[#B8B8B8]/55 hover:border-[rgba(166,255,0,0.55)] focus:border-[#A6FF00] focus:bg-[#0C120C] focus:ring-1 focus:ring-[#A6FF00]/40";

const fieldErrorClassName =
  "border-red-400/70 hover:border-red-400/80 focus:border-red-400 focus:ring-red-400/30";

const DELIVERY_ERROR =
  "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail oder WhatsApp.";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

export default function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (key !== "website" && errors[key as keyof ContactFieldErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as keyof ContactFieldErrors];
        return next;
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setSuccess(false);
    setFormError(null);

    const validation = validateContactForm(values);
    if (!validation.ok) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: validation.data.name,
          email: validation.data.email,
          subject: validation.data.subject,
          message: validation.data.message,
          website: validation.data.website,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; errors?: ContactFieldErrors; error?: string }
        | null;

      if (!response.ok || !data?.ok) {
        if (data?.errors) {
          setErrors(data.errors);
        } else {
          setFormError(data?.error || DELIVERY_ERROR);
        }
        return;
      }

      setValues(initialState);
      setSuccess(true);
    } catch {
      setFormError(DELIVERY_ERROR);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative rounded-[26px] border border-[#1F1F1F] bg-[#050806] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.035)] sm:p-7 lg:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className="text-[14px] font-semibold text-[#F5F5F5]">
            Vollständiger Name *
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            value={values.name}
            disabled={submitting}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            onChange={(e) => updateField("name", e.target.value)}
            className={`h-12 ${fieldClassName} ${errors.name ? fieldErrorClassName : ""}`}
          />
          {errors.name ? (
            <p id={`${formId}-name-error`} className="mt-1.5 text-[12px] text-red-400">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className="text-[14px] font-semibold text-[#F5F5F5]">
            E-Mail-Adresse *
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            value={values.email}
            disabled={submitting}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            onChange={(e) => updateField("email", e.target.value)}
            className={`h-12 ${fieldClassName} ${errors.email ? fieldErrorClassName : ""}`}
          />
          {errors.email ? (
            <p id={`${formId}-email-error`} className="mt-1.5 text-[12px] text-red-400">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={`${formId}-subject`} className="text-[14px] font-semibold text-[#F5F5F5]">
          Betreff *
        </label>
        <input
          id={`${formId}-subject`}
          name="subject"
          type="text"
          required
          maxLength={150}
          value={values.subject}
          disabled={submitting}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? `${formId}-subject-error` : undefined}
          onChange={(e) => updateField("subject", e.target.value)}
          className={`h-12 ${fieldClassName} ${errors.subject ? fieldErrorClassName : ""}`}
        />
        {errors.subject ? (
          <p id={`${formId}-subject-error`} className="mt-1.5 text-[12px] text-red-400">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div className="mt-5">
        <label htmlFor={`${formId}-message`} className="text-[14px] font-semibold text-[#F5F5F5]">
          Nachricht *
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={8}
          maxLength={5000}
          value={values.message}
          disabled={submitting}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          onChange={(e) => updateField("message", e.target.value)}
          className={`resize-y py-3 leading-7 ${fieldClassName} ${errors.message ? fieldErrorClassName : ""}`}
        />
        {errors.message ? (
          <p id={`${formId}-message-error`} className="mt-1.5 text-[12px] text-red-400">
            {errors.message}
          </p>
        ) : null}
      </div>

      <input
        id={`${formId}-website`}
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={values.website}
        onChange={(e) => updateField("website", e.target.value)}
        className="pointer-events-none absolute left-0 top-0 h-px w-px opacity-0"
      />

      {success ? (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 flex gap-3 rounded-2xl border border-[#A6FF00]/35 bg-[#0A1008] px-4 py-3.5"
        >
          <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#A6FF00]" aria-hidden="true" />
          <div>
            <p className="text-[14px] font-semibold text-[#F5F5F5]">Vielen Dank für Ihre Nachricht.</p>
            <p className="mt-1 text-[13px] leading-6 text-[#E6E6E6]/86">
              Wir haben Ihre Anfrage erhalten und werden sie innerhalb von 24 Stunden bearbeiten.
            </p>
          </div>
        </div>
      ) : null}

      {formError ? (
        <p
          role="alert"
          className="mt-6 rounded-2xl border border-red-400/40 bg-[#1A0A0A] px-4 py-3 text-[13px] leading-6 text-red-300"
        >
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className={`${ctaSolidGreenClass} mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#A6FF00] px-6 py-3 text-[13px] font-extrabold uppercase tracking-[0.13em] transition duration-300 hover:-translate-y-0.5 hover:bg-[#B8FF4D] disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-70 sm:w-auto`}
      >
        {submitting ? "Nachricht wird gesendet…" : "Nachricht senden"}
      </button>
    </form>
  );
}
