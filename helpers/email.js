const nodemailer = require("nodemailer");
const { MAIL_USER, MAIL_PASSWORD } = require("../config/credits.env");

module.exports = async function email(email, subject, message, file) {
  const transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    requireTLS: true,
    secure: false,
    service: "outlook",
    port: 587,
    auth: {
      user: `${MAIL_USER}`,
      pass: `${MAIL_PASSWORD}`,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  const mailOpions = {
    from: MAIL_USER,
    to: email,
    subject: `${subject}`,
    html: `${message}`,
  };

  if (file.name) {
    mailOpions.attachments = [
      {
        filename: file.name,
        href: file.path,
        contentType: "application/pdf",
      },
    ];
  }

  return new Promise(async (resolve, reject) => {
    transport.sendMail(mailOpions, (err, result) => {
      if (err) {
        console.log("Error in Mail: ", err);
        reject(false);
      } else {
        console.log("Email sent: ", result.response);
        resolve(true);
      }
    });
  });
};
