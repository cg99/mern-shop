const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = express.json()

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51GtmvJLXX9ZK66L1nGK0bu3g0PxK88ShHmmw13xeItx1JzRNgNQQTb7rfsbBzH6mjfIJAlgznOtCaHmsnfEhO6ms00ZHlM6m4F');

router.post('/create-checkout-session', jsonParser, async (req, res) => {
    
    const data = req.body;
    const lineItems = JSON.parse(data.items).map(item => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price,
            },
            quantity: item.quantity
        }
    })
    // console.log(lineItems);

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/',
            cancel_url: 'http://localhost:3000/products',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.log(error)
        res.send("Process Failed")
    }
});

module.exports = router