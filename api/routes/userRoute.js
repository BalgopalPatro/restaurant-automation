var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const User = require('../models/user').model;

router.post('/signup', (req, res) => {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    User.find({ email: req.body.email }, (err, result) => {
        if (result.length > 0) {
            res.json({ status: "error", msg: "User Exist" })
        } else {
            console.log(user)
            user.save()
            res.json({ status: "done", user: user })
        }
    })
})

router.post('/signin', (req, res) => {
    User.find({ email: req.body.email }, (err, result) => {
        if (err) {
            console.log(err)
            res.json({ status: "error", msg: err })
        }
        if (result.length > 0) {
            var user = result[0]
            console.log(user)
            if (user.password == req.body.password) {
                res.json({ status: "done", user: user })
            } else {
                res.json({ status: "error", msg: "Wrong Password" })
            }
        } else {
            res.json({ status: "error", msg: "No User Found In this email" })
        }
    })
})

module.exports = router