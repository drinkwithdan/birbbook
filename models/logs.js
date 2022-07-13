const mongoose = require("mongoose")
const Schema = mongoose.Schema

const logSchema = new Schema(
    {
        date: { type: Date, required: true, default: Date.now },
        location: { type: String, required: true },
        birds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bird"
        }],
        notes: { type: String },
        imageURL: { type: String, default: 'https://loremflickr.com/600/600/bird' }
    },
    { timestamps: true }
)

const Log = mongoose.model("Log", logSchema)

module.exports = Log