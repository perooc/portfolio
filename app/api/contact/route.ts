import { Resend } from "resend";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

// Sistema simple de rate limiting (en producción usa Redis o similar)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Lista de dominios de email temporales comunes
const temporaryEmailDomains = [
  "10minutemail.com",
  "tempmail.com",
  "guerrillamail.com",
  "throwaway.email",
  "mailinator.com",
  "trashmail.com",
];

// Verificar reCAPTCHA
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY no está configurada");
    return false;
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${token}`,
      },
    );

    const data = await response.json();

    // Score mayor a 0.5 se considera humano (ajusta según necesites)
    return data.success && data.score > 0.5;
  } catch (error) {
    console.error("Error verificando reCAPTCHA:", error);
    return false;
  }
}

// Rate limiting
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  // Limpiar registros antiguos
  if (record && now > record.resetTime) {
    requestCounts.delete(ip);
  }

  if (!record) {
    // Primera solicitud
    requestCounts.set(ip, {
      count: 1,
      resetTime: now + 60 * 60 * 1000, // 1 hora
    });
    return true;
  }

  // Límite: 3 mensajes por hora
  if (record.count >= 3) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message, website, recaptchaToken } = body;

    // 1. HONEYPOT: Si el campo "website" tiene valor, es un bot
    if (website) {
      console.log("Bot detectado por honeypot");
      // Devolver éxito falso para no revelar la defensa
      return NextResponse.json(
        { message: "Email enviado exitosamente" },
        { status: 200 },
      );
    }

    // 2. Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 },
      );
    }

    // 3. Validación de longitud
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: "El nombre debe tener entre 2 y 100 caracteres" },
        { status: 400 },
      );
    }

    if (message.length < 20 || message.length > 1000) {
      return NextResponse.json(
        { error: "El mensaje debe tener entre 20 y 1000 caracteres" },
        { status: 400 },
      );
    }

    // 4. Verificar email temporal
    const emailDomain = email.split("@")[1]?.toLowerCase();
    if (temporaryEmailDomains.includes(emailDomain)) {
      return NextResponse.json(
        { error: "Por favor usa un email permanente" },
        { status: 400 },
      );
    }

    // 5. Verificar reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "Verificación de seguridad fallida" },
        { status: 400 },
      );
    }

    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      console.log("reCAPTCHA falló - posible bot");
      return NextResponse.json(
        { error: "Verificación de seguridad fallida" },
        { status: 400 },
      );
    }

    // 6. Rate limiting por IP
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for") ||
      headersList.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error:
            "Has excedido el límite de mensajes. Por favor intenta más tarde.",
        },
        { status: 429 },
      );
    }

    // 7. Validación de contenido spam (palabras clave básicas)
    const spamKeywords = [
      "viagra",
      "casino",
      "lottery",
      "prize",
      "click here",
      "buy now",
    ];
    const messageLower = message.toLowerCase();
    const hasSpam = spamKeywords.some((keyword) =>
      messageLower.includes(keyword),
    );

    if (hasSpam) {
      console.log("Contenido spam detectado");
      return NextResponse.json(
        { error: "Tu mensaje contiene contenido no permitido" },
        { status: 400 },
      );
    }

    // 8. Enviar email
    const data = await resend.emails.send({
      from: "PEROOC Contacto <onboarding@resend.dev>",
      to: ["peroocsa@gmail.com"],
      replyTo: email,
      subject: `Nuevo contacto de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0B1220;">Nuevo mensaje de contacto</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nombre:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            ${company ? `<p style="margin: 10px 0;"><strong>Empresa:</strong> ${company}</p>` : ""}
            <p style="margin: 10px 0;"><strong>IP:</strong> ${ip}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #0B1220;">Mensaje:</h3>
            <p style="line-height: 1.6; color: #333;">${message}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="color: #666; font-size: 12px;">
            Este mensaje fue enviado desde el formulario de contacto de PEROOC y ha pasado todas las validaciones de seguridad.
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Email enviado exitosamente", data },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error enviando email:", error);
    return NextResponse.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 },
    );
  }
}
