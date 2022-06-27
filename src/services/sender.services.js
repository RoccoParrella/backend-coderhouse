const emailSender = require('../notifications/email');
const wspSender = require('../notifications/twilio');

module.exports = {
    async sendEmailAndWsp(asunto, template, email) {
        await wspSender.sendWhatsapp("+5491165212282", asunto);
        await emailSender.send(template, asunto, email);
    },
    async sendEmail(template, asunto, email) {
        await emailSender.send(template, asunto, email);
    }
}