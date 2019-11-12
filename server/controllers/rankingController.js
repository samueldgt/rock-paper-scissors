const Ranking = require('../models/Ranking')

exports.all = async (req, res) => {
  try {
    const ranking = await Ranking.find().sort({victories: -1})
    res.status(200).json({ranking})
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
}

exports.create = async (req, res) => {
  try {
    const ranking = new Ranking(req.body)
    await ranking.save()
    res.status(200).json({ranking})
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
}

exports.edit = async (req, res) => {    
  try {
    const ranking = await Ranking.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
    res.status(200).json({ranking})
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
}