// Initialising
const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/users")
const userRouter = express.Router()

// SIGNUP GET
userRouter.get("/signup", (req, res)=>{
    res.render("users/signup.ejs", {
        currentUser: req.session.currentUser,
        baseUrl: req.baseUrl,
        tabTitle: "Sign Up"
    })
})

// SIGNUP POST
userRouter.post("/", (req, res)=>{
    req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync()
    )
    User.create(req.body)
        .then((newUser)=>{
            console.log("New user: ", newUser)
            req.session.currentUser = newUser
            res.redirect("/logs")
        })
        .catch((err)=>{
            // TO-DO: Flash message "Username already exists"
            res.redirect("/signup")
        })
})

module.exports = userRouter
