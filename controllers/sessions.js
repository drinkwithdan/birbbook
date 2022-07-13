// REQUIRES

const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/users")
const sessionsRouter = express.Router()

// ROUTES

// localhost:PORT/login GET
sessionsRouter.get("/login", (req, res)=>{
    res.render("sessions/login.ejs", {
        tabTitle: "Log In",
        baseUrl: req.baseUrl,
        currentUser: req.session.currentUser
    })
})

// localhost:PORT/login POST
sessionsRouter.post("/login", (req, res)=>{
    User.findOne({ username: req.body.username })
        .exec()
        .then((user)=>{
            if (!user) {
                //user not found
                req.flash("error", "Username or password is incorrect")
                return res.redirect(req.baseUrl + "/login")
            }
            const passwordIsCorrect = bcrypt.compareSync(req.body.password, user.password)
            if (!passwordIsCorrect) {
                // user found but password incorrect
                req.flash("error", "Username or password is incorrect")
                res.redirect(req.baseUrl + "/login")
            } else {
                // user found and password correct
                req.flash("success", "User logged in successfully")
                req.session.currentUser = user
                res.redirect("/logs")
            }
        })
})

// localhost:PORT/logout DELETE
sessionsRouter.delete("/logout", (req, res)=>{
    req.session.destroy(()=>{
        req.flash("info", "User logged out")
        res.redirect("/logs")
    })
})

module.exports = sessionsRouter
