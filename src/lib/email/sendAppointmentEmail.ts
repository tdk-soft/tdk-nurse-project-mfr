import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendAppointmentConfirmationEmail(data: {
  email: string
  firstName: string
  date: string
  time: string
}) {
  await resend.emails.send({
    from: 'MFR Care <onboarding@resend.dev>',
    to: data.email,
    subject: 'Confirmation de votre rendez-vous',
    html: `
      <h2>Bonjour ${data.firstName},</h2>
      <p>Votre rendez-vous est confirmé :</p>
      <ul>
        <li><strong>Date :</strong> ${data.date}</li>
        <li><strong>Heure :</strong> ${data.time}</li>
      </ul>
      <p>Merci pour votre confiance.</p>
    `
  })
}