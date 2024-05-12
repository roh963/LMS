import nodemailer from "nodemailer";

const sendEmail = async  function (email,subject,message){
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: message, // html body
      });
  };

  export default sendEmail;