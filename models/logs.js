const mongoose = require("mongoose")
const Schema = mongoose.Schema

const logSchema = new Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        notes: { type: String },
        imageURL: { type: String, default: 'https://loremflickr.com/600/600/bird' }
    },
    { timestamps: true }
)

const Log = mongoose.model("Log", logSchema)

module.exports = Log