const _ = require("lodash")
const Feed = require("../models/feed")

const getAllFeeds = function () {
  return Feed.find({})
}

const getAllFeedsForUser = function (req) {
  return Feed.find({
    user_id: req.user._id,
  })
}


const determineTotalDurationOfFeed = function ({ left_breast_duration, right_breast_duration, bottle_duration }) {
  // If breast fed
  if (Number(left_breast_duration) > 0 || Number(right_breast_duration) > 0) {
    return _.sum([Number(left_breast_duration), Number(right_breast_duration)])
  } else {
    // If bottle fed
    return Number(bottle_duration)
  }
}

const addFeed = function (req) {
  req.body.total_duration = determineTotalDurationOfFeed(req.body)
  req.body.user_id = req.user
  return Feed(req.body)
}

const getFeedById = function (id) {
  return Feed.findById(id)
}

const deleteFeed = function (id) {
  return Feed.findByIdAndRemove(id)
}

const updateFeed = function (req) {
  //new: true will return the updated feed
  return Feed.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
}

module.exports = {
  getAllFeeds,
  getAllFeedsForUser,
  addFeed,
  getFeedById,
  deleteFeed,
  updateFeed,
}