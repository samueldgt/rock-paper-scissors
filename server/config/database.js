const mongoose = require('mongoose')
const databaseUrl = process.env.DB_URL
const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

module.exports = () => {
  mongoose.connect(databaseUrl, mongooseConfig)
    .then(() => console.info('Database has been connected'))
    .catch((err) => {
      console.error('DB connection has failed')
      console.error(err.message)
      console.error(err.reason)
    })
}