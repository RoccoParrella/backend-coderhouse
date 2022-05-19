const twilioSender = require('../notifications/twilio');
const emailSender = require('../notifications/email');
const modelCart = require('../models/cartList');

module.exports = {
    sendEmailAndWsp: async (req, res) => {
        const { cartId } = req.params;
        const { name, lastname, email } = req.user
        const fullName = `${name} ${lastname}`;
        const cart = await modelCart.getCartById(cartId);
        const products = cart.products;
        const mapeoDeProductos = products.map(p => `<li>${p.tipo}: ${p.title}</li>`)
        const template = `
            <h1>Hola ${fullName}</h1>
            <p>Estos son los productos que ha agregado a la lista de favoritos:</p>
            <ul>
                ${mapeoDeProductos.join(' ')}
            </ul>
        `
        const asunto = `nuevo pedido de ${fullName}, su email es ${email}`;
        try {
            await twilioSender.sendWhatsapp("+5491165212282", asunto);
            await emailSender.send(template, asunto, email);
            await modelCart.emptyCart(cartId);
            res.status(200).json({
                message: 'Email and Whatsapp sent successfully'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong'
            });
        }
    }
}