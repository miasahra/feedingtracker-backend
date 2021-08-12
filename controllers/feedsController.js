const {
  getAllFeeds,
  getAllFeedsForUser,
  addFeed,
  getFeedById,
  deleteFeed,
  updateFeed,
} = require("../utils/feedsUtils")

const Dependant = require("../models/dependant")

const getFeeds = function (req, res) {
  getAllFeeds(req).exec((err, feeds) => {
    if (err) {
      res.status(500)
      return res.json({
        error: err.message,
      })
    }
    res.send(feeds)
  })
}

const getFeedsForUser = function (req, res) {
  getAllFeedsForUser(req).exec((err, feeds) => {
    if (err) {
      res.status(500)
      return res.json({
        error: err.message,
      })
    }
    res.send(feeds)
  })
}

const getFeed = function (req, res) {
  getFeedById(req.params.id).exec((err, feed) => {
    if (err) {
      res.status(404)
      return res.json({
        error: err.message,
      })
    }
    res.send(feed)
  })
}

const newFeed = async function (req, res) {
  addFeed(req).save(async (err, feed) => {
    if (err) {
      res.status(500)
      return res.json({
        error: err.message,
      })
    } else {
      // Add Feed to Dependant association when created
      await Dependant.findByIdAndUpdate(
        req.body.dependant_id,
        { $push: { feeds: feed._id } },
        { upsert: true, new : true }
      )
    }
    res.send(feed)
  })
}

const removeFeed = async function (req, res) {
  deleteFeed(req.params.id).exec(async (err, feed) => {
    if (err) {
      res.status(404)
      return res.json({
        error: err.message,
      })
    } else {
      // Remove Feed from Dependant association when deleted
      await Dependant.findByIdAndUpdate(
        req.body.dependant_id,
        { $pull: { feeds: feed._id } },
        { upsert: true, new : true }
      )
    }
    res.sendStatus(204)
  })
}

const changeFeed = function (req, res) {
  updateFeed(req).exec((err, feed) => {
    if (err) {
      res.status(404)
      return res.json({
        error: err.message,
      })
    }
    res.status(200)
    res.send(feed)
  })
}

module.exports = {
  getFeeds,
  getFeedsForUser,
  newFeed,
  getFeed,
  removeFeed,
  changeFeed,
}