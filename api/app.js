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
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  const handshakeData = socket.request;
  const userID = handshakeData._query['userID']
  console.log("Socket connect userID:", userID);

  userIDToSocket.set(userID, socket);
  
  socket.on('disconnect', () => {
    userIDToSocket.delete(userID);
    console.log("Socket disconnect userID:", userID);
  });
});


const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin: FRONTEND_ADDRESS,
    credentials: true,
  }),
)
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
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/users', usersRouter);
app.use('/calls', callsRouter);
app.use('/swipes', swipesRouter);

app.get('/', (req, res) => {
  res.send('RehumanizeDating')
})

app.listen(PORT, () => {
  console.log(`RehumanizeDating listening on PORT ${PORT}`);
})


module.exports = {app, io};
