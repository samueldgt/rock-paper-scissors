exports.notFound = (req, res, next) => {
  let err = new Error('Resource not found')
  err.status = 404
  next(err)
},
exports.serverError = (err, req, res, next) => {
  res.status(500).json({
    error: err.message || 'Internal server error'
  })
}