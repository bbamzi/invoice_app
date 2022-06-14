const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a Transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '393923231b0e35',
      pass: '4870468147cc28',
    },
  });

  // Define Email Options
  const mailOptions = {
    from: 'akinbode bsms <hello@akinnbode.io',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Send email with nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
