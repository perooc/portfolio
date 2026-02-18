"use client";

import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    website: "", // HONEYPOT - campo oculto
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success",
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    // HONEYPOT: Si el campo "website" está lleno, es un bot
    if (formData.website) {
      console.log("Bot detectado por honeypot");
      setIsSubmitting(false);
      // No mostramos error al bot para no revelar nuestra defensa
      setMessageType("success");
      setSubmitMessage("¡Gracias! Tu mensaje ha sido enviado.");
      setTimeout(() => setSubmitMessage(""), 3000);
      return;
    }

    try {
      // Ejecutar reCAPTCHA
      if (!executeRecaptcha) {
        throw new Error("reCAPTCHA no está disponible");
      }

      const recaptchaToken = await executeRecaptcha("contact_form");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessageType("success");
        setSubmitMessage(
          "¡Gracias! Tu mensaje ha sido enviado. Nos pondremos en contacto pronto.",
        );
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
          website: "",
        });
      } else {
        setMessageType("error");
        setSubmitMessage(
          data.error ||
            "Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.",
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setMessageType("error");
      setSubmitMessage(
        "Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 7000);
    }
  };

  return (
    <section
      id="contacto"
      className="py-24 bg-gradient-to-br from-primary via-primary to-primary-light"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Hablemos de tu proyecto
          </h2>
          <p className="text-xl text-accent">
            Cuéntanos cómo podemos ayudarte a alcanzar tus objetivos
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
        >
          <div className="space-y-6">
            {/* Nombre */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Nombre completo *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={100}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-gray-900"
                placeholder="Tu nombre"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-gray-900"
                placeholder="tu@email.com"
              />
            </div>

            {/* Empresa */}
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Empresa
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                maxLength={100}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-gray-900"
                placeholder="Nombre de tu empresa"
              />
            </div>

            {/* HONEYPOT - Campo oculto */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Mensaje */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-primary mb-2"
              >
                Cuéntanos sobre tu proyecto *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                minLength={20}
                maxLength={1000}
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all resize-none text-gray-900"
                placeholder="Describe brevemente lo que necesitas..."
              />
              <p className="text-sm text-gray-500 mt-1">Mínimo 20 caracteres</p>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-light hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-light/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </button>

            {/* Mensaje de confirmación/error */}
            {submitMessage && (
              <div
                className={`text-center font-semibold p-4 rounded-lg ${
                  messageType === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {submitMessage}
              </div>
            )}

            {/* Aviso reCAPTCHA */}
            <p className="text-xs text-gray-500 text-center">
              Este sitio está protegido por reCAPTCHA y aplican la{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Política de Privacidad
              </a>{" "}
              y los{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Términos de Servicio
              </a>{" "}
              de Google.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
