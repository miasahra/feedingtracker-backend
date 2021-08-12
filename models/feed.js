const mongoose = require("mongoose")

const Schema = mongoose.Schema
const normalize = require("normalize-mongoose")

const Feed = new Schema({
  type: {
    type: String,
    enum: ["BREAST", "BOTTLE"],
    required: true,
  },
  left_breast_duration: {
    type: Number,
    required: false,
    integer: true,
  },
  right_breast_duration: {
    type: Number,
    required: false,
    integer: true,
  },
  bottle_duration: {
    type: Number,
    required: false,
    integer: true,
  },
  total_duration: {
    type: Number,
    required: true,
    integer: true,
  },
  measurement: {
    type: Number,
    required: false,
    integer: true,
  },
  dependant_id: {
    type: Schema.Types.ObjectId,
    ref: "Dependant",
  },
  dependant_name: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true })

Feed.plugin(normalize)
module.exports = mongoose.model("Feed", Feed)