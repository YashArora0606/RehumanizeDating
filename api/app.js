const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const usersRouter = require('./routes/users')
const swipesRouter = require('./routes/swipes')
const callsRouter = require('./routes/calls')

const { FRONTEND_ADDRESS } = require('./config')

const app = express()
const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin: FRONTEND_ADDRESS,
    credentials: true,
  }),
)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': FRONTEND_ADDRESS,
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, authentication',
    'Access-Control-Allow-Methods': 'GET, PUT, PATCH, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': true,
  })
  next()
})

app.use('/users', usersRouter)

app.get('/', (req, res) => {
  res.send('RehumanizeDating')
})

app.listen(PORT, () => {
  console.log(`RehumanizeDating listening on PORT ${PORT}`);
})

module.exports = app
