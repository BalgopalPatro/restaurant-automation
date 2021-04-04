const express = require('express')
const router = express.Router();

const User = require('../models/user').model

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
                if (user.role == "admin") {
                    res.json({ status: "done", user: user })
                } else {
                    res.json({ status: "error", msg: "You are not an admin" })
                }
            } else {
                res.json({ status: "error", msg: "Wrong Password" })
            }
        } else {
            res.json({ status: "error", msg: "No User Found In this email" })
        }
    })
})

module.exports = router