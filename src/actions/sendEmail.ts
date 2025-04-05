'use server';

import nodemailer from 'nodemailer';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ActionResult {
  success: boolean;
  error?: string;
}

export async function sendEmail(data: FormData): Promise<ActionResult> {
  if (!data.name || !data.email || !data.message) {
    return { success: false, error: 'Missing form data.' };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587', 10),
    secure: parseInt(process.env.EMAIL_SERVER_PORT || '587', 10) === 465,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    replyTo: data.email,
    subject: `Wiadomość z formularza kontaktowego od: ${data.name}`,
    text: `
      Otrzymano nową wiadomość ze strony internetowej:

      Imię/Firma: ${data.name}
      Email: ${data.email}

      Wiadomość:
      ${data.message}
    `,
    html: `
      <h2>Otrzymano nową wiadomość ze strony internetowej</h2>
      <p><strong>Imię/Firma:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <hr>
      <p><strong>Wiadomość:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    console.log('Attempting to send email...');
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email.' };
  }
}