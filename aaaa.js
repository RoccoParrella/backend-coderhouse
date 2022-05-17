const twilioSender = require('./notifications/twilio');

(async () => {
twilioSender.sendWhatsapp('+5491165212282', 'Hello World');
})()