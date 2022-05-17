const twilio = require('twilio');
const config = require('../config');

class SmsSender {
    constructor() {
        this.client = new twilio(config.TWILIO_SID, config.TWILIO_TOKEN);
    }

    // Funcion para enviar un mensaje de texto a un numero de telefono

    async sendWhatsapp(phone, message) {
        await this.client.messages.create({
            body: message,
            from:"whatsapp:+14155238886",
            to: "whatsapp:" + phone
        })
    }
}

module.exports = new SmsSender();