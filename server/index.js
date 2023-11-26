const express = require('express');
const { connectDb } = require('./db/connectDb');
const cors = require('cors');
const { userRouter } = require('./routes/user.routes');
require('dotenv').config();
const cookieParser = require("cookie-parser");
const { phoneRouter } = require('./routes/phone.routes');
const app = express();

const host = process.env.HOST;
const mongo_url = process.env.MONGO_URL;

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.ACCESS_TOKEN));

app.use('/user', userRouter);
app.use("/phone",phoneRouter)

app.get('/', (req, res) => {
  res.send('hello world');
});

startServer();

async function startServer() {
  await connectDb(mongo_url);
  app.listen(host, () => {
    console.log('lsiening at port 8000');
  });
}
