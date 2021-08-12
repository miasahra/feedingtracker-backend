const mongoose = require("mongoose")

const Schema = mongoose.Schema

const Dependant = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  feeds: [{
    type: Schema.Types.ObjectId,
    ref: "Feed", 
  }],
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true })

module.exports = mongoose.model("Dependant", Dependant)