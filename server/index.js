const express = require("express");
const cors = require('cors');
const stripe = require('stripe')('sk_test_51NGJfDSFVO01dJRlhSsvRF5igbmSH8UZtGIpFmUnYMliDhK2cPGyn3l6qofCIxPNmbhDwC4vvAuU57lFJtqu3UGC00H8jnNMtb');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/payment', async (req, res) => {
    const product = await stripe.products.create({
        name: "T-shirt"
    })

    if (product) {
        var price = await stripe.prices.create({
            product: `${product.id}`,
            unit_amount: 100 * 100,
            currency: "inr",
        })
    }

    if (price.id) {
        var session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: `${price.id}`,
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
            customer_email:'demo@gmail.com'
        })
    }
    res.send(session)
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})