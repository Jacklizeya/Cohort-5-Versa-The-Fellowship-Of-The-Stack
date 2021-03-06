const express = require("express");
const router = new express.Router();
const pool = require("../db");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {
    orderConfirmation,
    orderReadyForPickup,
} = require("../helperFunctions/sendGridFunctions");
const auth = require("../middleware/auth");
const optionalAuth = require("../middleware/optionalAuth");

router.post("/stripe/payment", (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "cad",
    };
    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes });
        }
    });
});

router.post("/paid", optionalAuth, async (req, res) => {
    const buyerID = req.user.id || 9999;
    const { email } = req.body.success;
    const {
        name,
        last4,
        address_line1,
        address_zip,
        address_city,
        address_country,
    } = req.body.success.card;
    const { deliveryType, deliveryNote } = req.body.payment;
    const pickup = deliveryType === "pickup";
    const { items, payment } = req.body;
    let orderResponse = await pool.query(
        `INSERT INTO orders
    (date, status, buyer_id, order_total, email, name, pickup, billing_address,shipping_address, delivery_notes)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning id`,
        [
            new Date().toLocaleString().replace(/\./g, ""),
            "Unfulfilled",
            buyerID,
            payment.amount / 100,
            email,
            name,
            pickup,
            `${address_line1} ${address_zip} ${address_city}, ${address_country}`,
            pickup
                ? `For pickup`
                : `${address_line1} ${address_zip} ${address_city}, ${address_country}`,
            deliveryNote,
        ]
    );

    for (item of items) {
        const orderItems = await pool.query(
            `
        INSERT INTO order_items
        (order_id, product_id, quantity, color, size)
        VALUES ($1,$2,$3,$4,$5)`,
            [
                orderResponse.rows[0].id,
                item.id,
                item.itemQuantity,
                item.colour,
                item.size,
            ]
        );
        const artistIDRes = await pool.query(
            "SELECT artist_id FROM products where id = " + item.id
        );
        const artistID = artistIDRes.rows[0].artist_id;
        const salesByProduct = await pool.query(
            `
        INSERT INTO sales_by_product
        (order_id, product_id, quantity, sale_price, artist_id, color, size, date)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
            [
                orderResponse.rows[0].id,
                item.id,
                item.itemQuantity,
                item.itemPrice,
                artistID,
                item.colour,
                item.size,
                new Date().toLocaleString().replace(/\./g, ""),
            ]
        );

        const reduceStock = await pool.query(
            `
        UPDATE stock set quantity=quantity-$1 where product_id=$2 AND color=$3 AND size=$4`,
            [item.itemQuantity, item.id, item.colour, item.size]
        );
        item.itemPrice = item.itemPrice.toFixed(2);
        item.itemTotal = (item.itemPrice * item.itemQuantity).toFixed(2);
    }

    const orderID = orderResponse.rows[0].id;

    const total = payment.amount / 100;
    orderConfirmation(items, name, email, orderID, deliveryType);
    res.status(200).send("payment complete");
});

router.put("/edit/:orderid", auth, async (req, res) => {
    const { orderStatus } = req.body;
    if (orderStatus.length === 0) {
        res.send({
            message: "You have to give me data to update with!",
        });
    }

    const response = await pool.query(
        `SELECT ship_date, status FROM orders WHERE id = ${req.user.id} ORDER BY DATE asc`
    );

    const order = response.rows[0];
    const updatedOrder = {};

    updatedOrder.status = orderStatus;

    updatedOrder.ship_date = req.body.shipDate || order.ship_date;

    try {
        const order = await pool.query(
            `UPDATE orders SET status = $1, ship_date = $2 WHERE id = $3`,
            [updatedOrder.status, updatedOrder.ship_date, req.params.orderid]
        );

        const infoToEmail = await pool.query(
            `SELECT o.order_total, o.id, o.shipping_address, o.name, o.email, o.date, o.ship_date, o.delivery_notes, o.phone, o.pickup, s.artist_id, s.product_id, s.quantity, s.color, s.size, u.username, u.address
            FROM orders o
            INNER JOIN sales_by_product s
            ON o.id = s.order_id
            INNER JOIN users u
            ON s.artist_id = u.id
            WHERE s.artist_id = ${req.user.id} and o.id = ${req.params.orderid}`
        );

        buyer = infoToEmail.rows[0];
        orderReadyForPickup(buyer);
        res.send("Updated");
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

module.exports = router;
