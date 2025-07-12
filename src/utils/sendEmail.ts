import nodemailer from "nodemailer";
import dotenv from "dotenv";
import handlebars from "handlebars";
import fs from "fs";

const registrationMail = async (
  email: string,
  fullName: string
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: process.env.MAIL_SERVICE,
      port: 465,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    const emailTemplateSource = fs.readFileSync(
      "./src/views/registration.hbs",
      "utf-8"
    );
    const template = handlebars.compile(emailTemplateSource);
    const htmlToSend = template({
      fullName: fullName,
    });
    let info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: `${email}`,
      subject: "Registration mail",
      text: "Account creation",
      html: htmlToSend,
      // console.log("info--------------------------", info);
      // console.log("Message sent: %s************************", info.messageId);
    });
    console.log(
      "Preview URL: %s-------------------",
      nodemailer.getTestMessageUrl(info)
    );
  } catch (err: any) {
    console.log(err, "err-------------");
  }
};
const sendActivationMail = async (
  email: string,
  fullName: string
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: process.env.MAIL_SERVICE,
      port: 465,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    const emailTemplateSource = fs.readFileSync(
      "./src/views/activationmail.hbs",
      "utf-8"
    );
    const template = handlebars.compile(emailTemplateSource);
    const htmlToSend = template({
      fullName: fullName,
    });
    let info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: `${email}`,
      subject: "Account activation mail",
      text: "Account activation",
      html: htmlToSend,
      // console.log("info--------------------------", info);
      // console.log("Message sent: %s************************", info.messageId);
    });
    console.log(
      "Preview URL: %s-------------------",
      nodemailer.getTestMessageUrl(info)
    );
  } catch (err: any) {
    console.log(err, "err-------------");
  }
};

export { registrationMail, sendActivationMail };
