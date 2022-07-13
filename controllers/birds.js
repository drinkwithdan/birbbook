const express = require("express")
const router = express.Router()
// const multer = require("multer")

const Bird = require("../models/birds")

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

// // Deactivated login gate for debugging
// router.use(isLoggedIn)

// INDEX route /logs GET
router.get("/", (req, res)=>{
    Bird.find()
        .exec()
        .then((birds)=>{
            res.render("birds/index.ejs", {
                currentUser: req.session.currentUser,
                birds: birds,
                baseUrl: req.baseUrl,
                tabTitle: "Birds Index"
            })
        })
})

// NEW route /new GET
router.get("/new", (req, res)=>{
    res.render("birds/new.ejs", {
        currentUser: req.session.currentUser,
        baseUrl: req.baseUrl,
        tabTitle: "Add New Bird"
    })
})

// NEW route / POST
router.post("/", (req, res)=>{
    if (req.body.native === "on") {
        req.body.native = true
    } else {
        req.body.native = false
    }
    // if (req.body.imageURL === "") {
    //     req.body.imageURL = "https://loremflickr.com/600/600" + req.body.name.replace(" ", "_")
    // }
    req.body.imageURL = req.file.path
    Bird.create(req.body)
        .then((newBird)=>{
            console.log("Created new bird", newBird);
            res.redirect(req.baseUrl)
        })
})

// SHOW route /:id GET
router.get("/:id", (req, res)=>{
    Bird.findById(req.params.id)
        .exec()
        .then((bird)=>{
            console.log(req.query);
            res.render("birds/show.ejs", {
                bird: bird,
                returnId: req.query.returnId,
                currentUser: req.session.currentUser,
                baseUrl: req.baseUrl,
                tabTitle: bird.name
            })
        })
})

// DESTROY route
router.delete("/:id", (req, res)=>{
    Bird.findByIdAndDelete(req.params.id)
        .exec()
        .then((bird)=>{
            console.log("Deleted Bird: " + bird)
            res.redirect(req.baseUrl)
        })
})

// EDIT route /:id PUT
router.put("/:id", (req, res)=>{
    if (req.body.native === "on") {
        req.body.native = true
    } else {
        req.body.native = false
    }
    if (req.body.imageURL === "") {
        req.body.imageURL = "https://loremflickr.com/600/600" + req.body.name.replace(" ", "_")
    }
    Bird.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .exec()
        .then((bird)=>{
            //Flash added new bird
            console.log(bird)
            res.redirect(req.baseUrl + "/" + bird.id)
        })
})

// EDIT route /:id/edit GET
router.get("/:id/edit", (req, res)=>{
    Bird.find()
        .exec()
        .then((bird)=>{
            res.render("birds/show.ejs", {
                bird: bird,
                currentUser: req.session.currentUser,
                baseUrl: req.baseUrl,
                tabTitle: "Edit Bird"
            })
        })
})


/////////////////////////////////////////
// EXPORT
/////////////////////////////////////////
module.exports = router
