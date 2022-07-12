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
                // TO-DO: Flash message "user not found"
                console.log("User not found")
                return res.redirect(req.baseUrl + "/login")
            }
            const passwordIsCorrect = bcrypt.compareSync(req.body.password, user.password)
            if (!passwordIsCorrect) {
                // user found but password incorrect
                // TO-DO: Flash message "Incorrect username or password"
                console.log("Incorrect username or password")
                res.redirect(req.baseUrl + "/logs")
            } else {
                // user found and password correct
                // TO-DO: Flash message "User logged in"
                console.log(user, "logged in")
                req.session.currentUser = user
                res.redirect("/logs")
            }
        })
})

// localhost:PORT/logout DELETE
sessionsRouter.delete("/logout", (req, res)=>{
    req.session.destroy(()=>{
        res.redirect("/logs")
    })
})

module.exports = sessionsRouter
