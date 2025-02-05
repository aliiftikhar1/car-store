import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email, token) {
  try {
     const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USERNAME, // Your Gmail username
            pass: process.env.EMAIL_PASSWORD, // Your Gmail password
          },
        });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Email Verification',
      text: `Please verify your email by clicking the following link: https://www.store2u.ca/customer/pages/verify?token=${token}`,
      html: `<p>Please verify your email by clicking the following link: <a href="https://www.store2u.ca/customer/pages/verify?token=${token}">Verify Email</a></p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully.');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
}
