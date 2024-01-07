const express = require('express');
const path = require('path');
const { connectDb } = require('./db/connectDb');
const cors = require('cors');
const { userRouter } = require('./routes/user.routes');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { phoneRouter } = require('./routes/phone.routes');
const { commentRouter } = require('./routes/comment.routes');
require('express-async-errors');

const app = express();

const host = process.env.HOST;
const mongo_url = process.env.MONGO_URL;

// app.use(express.static(path.resolve(__dirname, './public', 'dist')));

//middlewares
app.set('trust proxy', 1);
app.use(express.json());
app.use(cookieParser(process.env.ACCESS_TOKEN));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/user', userRouter);
app.use('/phone', phoneRouter);
app.use('/comment', commentRouter);

// app.use('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './public/dist/index.html'));
// });

// app.get('/', (req, res) => {
//   res.send('hello world');
// });

startServer();

async function startServer() {
  await connectDb(mongo_url);
  app.listen(host, () => {
    console.log('listening at port 8000');
  });
}
