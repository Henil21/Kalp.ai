import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  await resend.emails.send({
    from: `Kalp Labs <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    html,
  });
};
