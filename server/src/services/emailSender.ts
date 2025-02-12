import type { Request, Response } from "express";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  console.info(req.body);

  try {
    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: process.env.EMAIL_USER,
      subject: "Nouveau message de contact",
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    res.status(200).json({ message: "Envoi de l'email réussi" });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Erreur lors de l'envoi de l'email" });
  }
};
