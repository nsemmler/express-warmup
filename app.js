const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(morgan('dev'))

// API
app.get('/ping', function(req, res, next) {
  res.status(200).send({ message: 'pong!' })
})

app.use((req, res, next) => {
  next({ status: 404, message: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error(err)

  const errToReturn = {}
  errToReturn.status = err.status || 500
  errToReturn.message = err.message || 'Something went wrong'
  if (process.env.NODE_ENV !== 'production') errToReturn.stack = err.stack

  res.status(errToReturn.status).send(errToReturn)
})

const listener = () => `Listening on port ${port}`
app.listen(port, listener)

module.exports = app
