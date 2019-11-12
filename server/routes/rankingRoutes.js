const express = require('express')
const rankingRouter = express.Router()
const rankingController = require('../controllers/rankingController')

rankingRouter.get('/', rankingController.all)
rankingRouter.post('/', rankingController.create)
rankingRouter.patch('/:id', rankingController.edit)

module.exports = rankingRouter;
