import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { to, name, pdf } = await req.json();
    if (!to || !pdf) {
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }

    // pdf es data URI, extraemos base64
    const base64: string = typeof pdf === "string" && pdf.includes(",") ? pdf.split(",")[1]! : pdf;

    const GMAIL_USER = process.env.GMAIL_USER;
    const GMAIL_PASS = process.env.GMAIL_PASS; // Usa App Password de Gmail

    if (GMAIL_USER && GMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: GMAIL_USER, pass: GMAIL_PASS },
      });

      await transporter.sendMail({
        from: `Pedidos <${GMAIL_USER}>`,
        to,
        subject: `Pedido de ${name || "cliente"}`,
        html: `<p>Adjuntamos el PDF del pedido.</p>`,
        attachments: [
          {
            filename: "pedido.pdf",
            content: base64,
            encoding: "base64",
          },
        ],
      });

      return NextResponse.json({ ok: true, via: "gmail" });
    }

    // Fallback a Resend
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "Pedidos <onboarding@resend.dev>",
        to: [to],
        subject: `Pedido de ${name || "cliente"}`,
        html: `<p>Adjuntamos el PDF del pedido.</p>`,
        attachments: [
          {
            filename: "pedido.pdf",
            content: base64, // Resend acepta base64 sin encoding
          },
        ],
      });
      return NextResponse.json({ ok: true, via: "resend" });
    }

    return NextResponse.json(
      { error: "Configura GMAIL_USER/GMAIL_PASS o RESEND_API_KEY en .env.local" },
      { status: 500 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "No se pudo enviar" }, { status: 500 });
  }
}