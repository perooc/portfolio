import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 },
      );
    }

    // Enviar email
    const data = await resend.emails.send({
      from: "PEROOC Contacto <onboarding@resend.dev>", // Email verificado en Resend
      to: ["peroocsa@gmail.com"], // Tu email
      replyTo: email, // El email del cliente
      subject: `Nuevo contacto de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0B1220;">Nuevo mensaje de contacto</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nombre:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            ${company ? `<p style="margin: 10px 0;"><strong>Empresa:</strong> ${company}</p>` : ""}
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #0B1220;">Mensaje:</h3>
            <p style="line-height: 1.6; color: #333;">${message}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="color: #666; font-size: 12px;">
            Este mensaje fue enviado desde el formulario de contacto de PEROOC.
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
