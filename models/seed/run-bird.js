const mongoose = require("mongoose")
const Bird = require("../birds.js")
const seedBirds = require("./seed-birds.js")
const dbUrl = "mongodb://localhost:27017/birbbook"

mongoose.connect(dbUrl, ()=>{
    // Bird.insertMany(seedBirds)
    //     .then((birds)=>{
    //         console.log(birds)
    //         mongoose.connection.close()
    //     })
    console.log("Connected to logs DB")
    console.log("Resetting logs DB")
    Log.collection.drop()
        .then(()=>{
            console.log("Logs collection dropped")
            return Log.insertMany(seedData)
        })
        .then(()=>{
            console.log("Seed logs inserted")
            mongoose.connection.close()
        })
})