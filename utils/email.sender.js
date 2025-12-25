const nodemailer = require("nodemailer");
const CustomErrorHandler = require("./custom-error-handler");

const sendMessage = async (email, code) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bekzod2366@gmail.com",
        pass: "i l m d p r c z y o k d m s x p",
      },
    });
    return await transporter.sendMail({
      from: "bekzod2366@gmail.com",
      to: email,
      subject: "verification code",
      text: "tasdiqlash uchun",
      html: `<b style="font-size: 30px;"><b style="colour: blue;">${code}</b></b>`,
    });
  } catch (error) {
   throw CustomErrorHandler.BadRequest(error.message)
  }
};

module.exports = sendMessage