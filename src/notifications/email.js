const nodemailer = require('nodemailer')

class MailSender {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: process.env.emailSender,
                pass: process.env.PwdSender
            }
        });
    }

    // Function to send email to user when he registers

    async send(template, asunto, email) {
        const mailOptions = {
            subject: asunto,
            to: email,
            html: template
        }
        await this.transporter.sendMail(mailOptions)
    }
}

module.exports = new MailSender()