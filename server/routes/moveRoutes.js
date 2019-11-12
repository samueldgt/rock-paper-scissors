const express = require('express')
const moveRouter = express.Router()
const moveController = require('../controllers/moveController')

moveRouter.get('/', moveController.all)
moveRouter.post('/', moveController.create)

module.exports = moveRouter;