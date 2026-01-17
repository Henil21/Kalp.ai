export const sendEmail = async ({ to, subject, otp }) => {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: auto; padding: 20px;">
        <h2 style="margin-bottom: 10px;">Kalp Labs</h2>

        <p>Hello,</p>

        <p>
          This email was sent from <strong>Kalp Labs</strong> to verify your identity.
        </p>

        <p>Your One-Time Password (OTP) is:</p>

        <h1 style="letter-spacing: 4px; margin: 20px 0;">
          ${otp}
        </h1>

        <p>
          This OTP will expire in <strong>5 minutes</strong>.
        </p>

        <hr style="margin: 24px 0;" />

        <p style="font-size: 12px; color: #666;">
          If you did not request this verification, please ignore this email.
        </p>

        <p style="font-size: 12px; color: #666;">
          © ${new Date().getFullYear()} Kalp Labs
        </p>
      </div>
    `;

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "Kalp Labs",
          email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [{ email: to }],
        subject: subject || "Kalp Labs – Verify your OTP",
        htmlContent: html,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Brevo error:", data);
      throw new Error("Email sending failed");
    }

    console.log("✅ Brevo email sent:", data);
    return data;
  } catch (error) {
    console.error("❌ sendEmail failed:", error);
    throw error;
  }
};
