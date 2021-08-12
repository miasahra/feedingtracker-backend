const Dependant = require("../models/dependant")
const Feed = require("../models/feed")

const addDependant = function (req) {
  req.body.user_id = req.user
  return Dependant(req.body)
}

const getAllDependantsForUser = function (req) {
  return Dependant.find({
    user_id: req.user._id,
  })
}

const getAllFeedsForDependant = function (req) {
  return Feed.find({
    dependant_id: req.params.id,
  })
}

const getDependantById = function (id) {
  return Dependant.findById(id)
}

const deleteDependant = function (id) {
  return Dependant.findByIdAndRemove(id)
}

const updateDependant = function (req) {
  // new: true will return the updated dependant
  return Dependant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
}

module.exports = {
  getAllDependantsForUser,
  getAllFeedsForDependant,
  addDependant,
  getDependantById,
  deleteDependant,
  updateDependant,
}