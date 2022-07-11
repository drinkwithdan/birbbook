const mongoose = require("mongoose")
const Log = require("../models/logs")
const seedLogs = require("./seed-logs")
const dbUrl = "mongodb://localhost:27017/birbbook"

mongoose.connect(dbUrl, ()=>{
    Log.insertMany(seedData)
        .then((logs)=>{
            console.log(logs)
            mongoose.connection.close()
        })
    // console.log("Connected to logs DB")
    // console.log("Resetting logs DB")
    // Log.collection.drop()
    //     .then(()=>{
    //         console.log("Logs collection dropped")
    //         return Log.insertMany(seedData)
    //     })
    //     .then(()=>{
    //         console.log("Seed logs inserted")
    //         mongoose.connection.close()
    //     })
})