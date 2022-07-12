const mongoose = require("mongoose")
const Schema = mongoose.Schema

const birdSchema = new Schema(
    {
        name: { type: String, required: true },
        type: String,
        conservationStatus: String,
        native: Boolean,
        description: String,
        imageURL: String
    }
)

const Bird = mongoose.model("Bird", birdSchema)

module.exports = Bird