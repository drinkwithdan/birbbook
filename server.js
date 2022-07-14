///////////////////////////////////////////////////////
// APP REQUIRES
///////////////////////////////////////////////////////

require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const session = require("express-session")
const flash = require("express-flash")
const mongoDBSession = require("connect-mongodb-session")

const usersController = require("./controllers/users")
const logsController = require("./controllers/logs")
const birdsController = require("./controllers/birds")
const sessionsController = require("./controllers/sessions")

const app = express()
const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL
const MongoDBStore = mongoDBSession(session)
const sessionStore = new MongoDBStore({
    uri: dbURL,
    collection: "sessions"
})

///////////////////////////////////////////////////////
// APP INITIALISATION
///////////////////////////////////////////////////////

// MIDDLEWARE
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  }))
app.use(flash())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))
app.use(methodOverride("_method"))

// CONTROLLERS
app.use("/", (req, res)=>{
  res.redirect("/login", {
    // tabTitle: "Log In",
    // baseUrl: req.baseUrl,
    // currentUser: req.session.currentUser
  })
})

app.use("/", sessionsController)
app.use("/users", usersController)
app.use("/logs", logsController)
app.use("/birds", birdsController)

// CONNECTIONS
mongoose.connect(dbURL, ()=>{
    console.log("Connected to logs db");
})

app.listen(PORT, ()=>{
    console.log("Server started at PORT: ", PORT);
})