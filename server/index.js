require('dotenv').config()
const express = require('express')
const helmet = require('helmet') // Increases API security by headers
const cors = require('cors') // Adds CORS (accepts requests coming from other origins)
const morgan = require('morgan') // Logger
const dbConnect = require('./config/database')
const { notFound, serverError } = require('./utils/errorHandler')
const moveRouter = require("./routes/moveRoutes"); 
const rankingRouter = require("./routes/rankingRoutes"); 

const app = express()
const port = process.env.SERVER_PORT

// configuration middleware zone
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

dbConnect()

app.use('/moves', moveRouter)
app.use('/ranking', rankingRouter)

app.use(notFound)
app.use(serverError)

app.listen(port, () => {
  console.info(`Server running on port ${ port }`)
});