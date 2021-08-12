const {
  getAllDependantsForUser,
  getAllFeedsForDependant,
  addDependant,
  getDependantById,
  deleteDependant,
  updateDependant,
} = require("../utils/dependantsUtils")

const User = require("../models/user")
const Feed = require("../models/feed")

const getDependantsForUser = function (req, res) {
  getAllDependantsForUser(req).exec((err, dependants) => {
    if (err) {
      res.status(500)
      return res.json({
        error: err.message,
      })
    }
    res.send(dependants)
  })
}

const getFeedsForDependant = function (req, res) {
  getAllFeedsForDependant(req).exec((err, feeds) => {
    if (err) {
      res.status(500)
      return res.json({
        error: err.message,
      })
    }
    res.send(feeds)
  })
}

const getDependant = function (req, res) {
  getDependantById(req.params.id).exec((err, dependant) => {
    if (err) {
      res.status(404)
      return res.json({
        error: err.message,
      })
    }
    res.send(dependant)
  })
}

const newDependant = async function (req, res) {
  addDependant(req).save(async (err, dependant) => {
    if (err) {
      res.status(500)
      return res.json({
        error: err.message,
      })
    } else {
      // Add Dependant to User association when created
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { dependants: dependant._id } },
        { upsert: true, new : true }
      )
    }
    res.send(dependant)
  })
}

const removeDependant = function async (req, res) {
  deleteDependant(req.params.id).exec(async (err, dependant) => {
    if (err) {
      res.status(404)
      return res.json({
        error: err.message,
      })
    } else {
      // Remove all Feeds that belonged to the Dependant.
      await Feed.deleteMany({
        dependant_id: dependant._id,
      })

      // Remove Dependant from User it belonged to.
      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { dependants: dependant._id } },
        { upsert: true, new : true }
      )
    }
    res.sendStatus(204)
  })
}

const changeDependant = function (req, res) {
  updateDependant(req).exec((err, dependant) => {
    if (err) {
      res.status(404)
      return res.json({
        error: err.message,
      })
    }
    res.status(200)
    res.send(dependant)
  })
}

module.exports = {
  getDependantsForUser,
  getFeedsForDependant,
  newDependant,
  getDependant,
  removeDependant,
  changeDependant,
}