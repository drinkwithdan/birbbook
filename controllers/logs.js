/////////////////////////////////////////
// INITIALISATION
/////////////////////////////////////////
const express = require("express")
const router = express.Router()

const Log = require("../models/logs")

// // Login gate for Stretch Goals
// const isLoggedIn = (req, res, next) => {
//     if (!req.session.currentUser) {
//       return res.redirect('/login')
//     }
//     next()
//   }

// router.use(isLoggedIn)

/////////////////////////////////////////
// ROUTES
/////////////////////////////////////////

// INDEX route /logs GET
router.get("/", (req, res)=>{
    Log.find()
        .exec()
        .then((logs)=>{
            res.render("index.ejs", {
                logs: logs,
                baseUrl: req.baseUrl,
                tabTitle: "Logs Index"
            })
        })
})

// NEW route /new GET
router.get("/new", (req, res)=>{
    res.render("new.ejs", {
        baseUrl: req.baseUrl,
        tabTitle: "Add New Log"
    })
})

// NEW route / POST
router.post("/", (req, res)=>{
    Log.create(req.body)
        .then((newLog)=>{
            // TO-DO: Flash created new log
            console.log("Created new log: ", newLog)
            res.redirect(req.baseUrl + newLog.id)
        })
})

// SHOW route /:id GET
router.get("/:id", (req, res)=>{
    Log.findById(req.params.id)
        .exec()
        .then((log)=>{
            res.render("show.ejs", {
                baseUrl: req.baseUrl,
                log: log,
                tabTitle: log.name
            })
        })
})

// DESTROY route /:id DELETE
router.delete("/:id", (req, res)=>{
    Log.findByIdAndDelete(req.params.id)
        .exec()
        .then((log)=>{
            // TO-DO: Flash "Deleted log"
            console.log("Deleted log: ", log)
            res.redirect(req.baseUrl)
        })
})

// EDIT route /:id PUT
router.put("/:id", (req, res)=>{
    Log.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .exec()
        .then((log)=>{
            // TO-DO: flash "Updated log"
            console.log("Updated log: ", log)
            res.redirect(req.baseUrl + log.id)
        })
})

// EDIT route /:id/edit GET
router.get("/:id/edit", (req, res)=>{
    Log.findById(req.params.id)
        .exec()
        .then((log)=>{
            res.render("edit.ejs", {
                baseUrl: req.baseUrl,
                log: log,
                tabTitle: "Update log: " + log.name
            })
        })
})

/////////////////////////////////////////
// EXPORT
/////////////////////////////////////////
module.exports = router