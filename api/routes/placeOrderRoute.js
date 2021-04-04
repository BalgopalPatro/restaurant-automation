var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Order = require('../models/order').model;

router.post('/', (req, res) => {
    var order = new Order({ ...req.body })
    order.save().then(result => {
        res.json({ status: "done" })
    }).catch((err) => {
        res.json({ status: "error", msg: err })
    })
})

router.get('/', (req, res) => {
    Order.find().sort([["time"]]).then((result) => {
        res.json({ status: "done", orders: result })
    }).catch(err => {
        res.json({ status: "error", msg: err })
    })
})

module.exports = router