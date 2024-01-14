const nodemailer = require("nodemailer");

 async function emailVerification(email){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
          user: "tanimkhan117@gmail.com",
          pass: "ptoubujguuzmkatq",
        },
      });

      const info = await transporter.sendMail({
        from: 'tanimkhan117@gmail.com', 
        to: email, 
        subject: "Hello ✔", 
        text: "Hello world?",
        html: '<div><img alt=""src=https://i.ibb.co/8d29d5H/tanim.jpg style=width:50px;height:50px;border-radius:50%><h1>Hello</h1><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius fuga cumque aliquid nemo totam omnis quam debitis animi officia non.</p><button style=background:#00f;padding:20px;border:none>EMAIL VERIFICATION DONE</button></div>', 
      });
}

module.exports = emailVerification