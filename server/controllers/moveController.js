const Move = require('../models/Move')
const defaultMoves =  [
  { move: 'paper', kills: 'rock'},
  { move: 'rock', kills: 'scissors'},
  { move: 'scissors', kills: 'paper'}
]

exports.all = async (req, res) => {
  try {
    let moves = await Move.find()
    if (moves.length === 0) {
      for (let index = 0; index < defaultMoves.length; index++) {
        const newMove = new Move({
          move: defaultMoves[index].move,
          kills: defaultMoves[index].kills
        })
        await newMove.save()
      }
      moves = await Move.find()
    }
    res.status(200).json({moves})
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
}

exports.create = async (req, res) => {
  try {
    await Move.deleteMany({})
    let newMoves = req.body
    for (let index = 0; index < newMoves.length; index++) {
      const newMove = new Move({
        move: newMoves[index].move,
        kills: newMoves[index].kills
      })
      await newMove.save()
    }
    let moves = await Move.find()
    console.log(moves)
    res.status(200).json({moves})
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
}
