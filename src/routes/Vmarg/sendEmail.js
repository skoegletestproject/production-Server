const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, body) => {
    console.log(to, subject, body);
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'alert.geocam@gmail.com',
                pass: 'aovvjbvhsmoqpzrq'
            }
        });

        let mailOptions = {
            from: 'alert.geocam@gmail.com',
            to,
            subject,
            text: body
            // html: `<b>${body}</b>`
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;