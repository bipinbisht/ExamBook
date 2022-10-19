const nodemailer = require("nodemailer");
const { NotFoundError, BadRequestError } = require("../errors");

const sendEmail = async ({ email, emailBody, subject }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  if (email === " ") throw new NotFoundError("No email found to send otp...");
  var mailOptions = {
    from: `"Exam Bell" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `${subject}`,
    html: emailBody,
  };

  await transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("email sent...");
    }
  });
};
module.exports = {
  sendEmail,
};
