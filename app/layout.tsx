import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PEROOC - Soluciones SaaS Personalizadas para tu Negocio",
  description:
    "Desarrollamos soluciones tecnológicas personalizadas que transforman la manera en que tu empresa opera y crece en el mundo digital. Servicios SaaS B2B profesionales.",
  keywords: [
    "SaaS",
    "desarrollo web",
    "soluciones tecnológicas",
    "software empresarial",
    "desarrollo de software",
    "PEROOC",
  ],
  authors: [{ name: "PEROOC" }],
  creator: "PEROOC",

  // Open Graph (para redes sociales)
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://perooc.com", // Cambia esto cuando tengas dominio
    siteName: "PEROOC",
    title: "PEROOC - Soluciones SaaS Personalizadas",
    description:
      "Desarrollamos soluciones tecnológicas que transforman tu negocio en el mundo digital.",
    images: [
      {
        url: "/og-image.png", // Crearemos esta imagen después
        width: 1200,
        height: 630,
        alt: "PEROOC - Soluciones SaaS",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "PEROOC - Soluciones SaaS Personalizadas",
    description:
      "Desarrollamos soluciones tecnológicas que transforman tu negocio en el mundo digital.",
    images: ["/og-image.png"],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verificación (cuando las tengas)
  // verification: {
  //   google: "tu-codigo-de-verificacion",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* Theme color para móviles */}
        <meta name="theme-color" content="#0B1220" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
