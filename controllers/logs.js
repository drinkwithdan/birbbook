/////////////////////////////////////////
// INITIALISATION
/////////////////////////////////////////
const express = require("express")
const router = express.Router()
const upload = require("../middlewares/upload.js")

const Bird = require("../models/birds.js")
const Log = require("../models/logs.js")
// const upload = multer({ dest: "uploads" })

// Login gate for Stretch Goals 1.
const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect('/login')
    }
    next()
  }

/////////////////////////////////////////
// ROUTES
/////////////////////////////////////////

// INDEX route /logs GET
router.get("/", (req, res)=>{
            Log.find()
            .populate("birds")
            .exec()
            .then((logs)=>{
                res.render("index.ejs", {
                    currentUser: req.session.currentUser,
                    logs: logs,
                    baseUrl: req.baseUrl,
                    tabTitle: "Logs Index"
                })
            })
})

// // Deactivated login gate for debugging
// router.use(isLoggedIn)

// NEW route /new GET
router.get("/new", (req, res)=>{
    Bird.find()
        .exec()
        .then((birds)=>{
            res.render("new.ejs", {
                birds: birds,
                currentUser: req.session.currentUser,
                baseUrl: req.baseUrl,
                tabTitle: "Add New Log"
            })
        })
        .catch((err)=>{
            console.log(err);
        })
})

// NEW route / POST
router.post("/", upload.single("image"), (req, res)=>{
    req.body.imageURL = req.file.path
    console.log(req.body)
    Log.create(req.body)
        .then((newLog)=>{
            // TO-DO: Flash created new log
            console.log("Created new log: ", newLog)
            res.redirect(req.baseUrl)
        })
})

// SHOW route /:id GET
router.get("/:id", (req, res)=>{
    Bird.find()
        .exec()
        .then((birds)=>{
            Log.findById(req.params.id)
            .populate("birds")
            .exec()
            .then((log)=>{
                res.render("show.ejs", {
                    birds: birds,
                    currentUser: req.session.currentUser,
                    baseUrl: req.baseUrl,
                    log: log,
                    tabTitle: log.name
                })
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
            res.redirect(req.baseUrl + "/" + log.id)
        })
})

// EDIT route /:id/edit GET
router.get("/:id/edit", (req, res)=>{
    Bird.find()
        .exec()
        .then((birds)=>{
            Log.findById(req.params.id)
            .exec()
            .then((log)=>{
                res.render("edit.ejs", {
                    birds: birds,
                    currentUser: req.session.currentUser,
                    baseUrl: req.baseUrl,
                    log: log,
                    tabTitle: "Update log: " + log.date
                })
            })
        })
})

/////////////////////////////////////////
// EXPORT
/////////////////////////////////////////
module.exports = router