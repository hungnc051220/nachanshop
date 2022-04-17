const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
    const { code, name, email, date} = req.body;
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_ID, // generated ethereal user
          pass: process.env.MAIL_PASS // generated ethereal password
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
          },
      });
    
      // send mail with defined transport object
      await transporter.sendMail({
        from: '"NachanShop" <hungkennn1@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Đặt hàng thành công tại NachanShop", // Subject line
        html: `<div>
        <p>Xin chào <b>${name}</b>,</p>
        <p>Chúng tôi đã nhận được đơn hàng của bạn và sẽ sớm liên hệ lại với bạn.</p>
        <p>Mã đơn hàng: <b>#${code}</b></p>
        <p>Ngày đặt hàng: <b>${date}</b></p>
        <p>Cảm ơn bạn đã đặt hàng tại <b style='color: red'>NachanShop</b>!</p>
        </div>`, // html body
      });

      res.status(200).json({ message: "Sent email successfully!" });
}   

module.exports = {
    sendMail
}