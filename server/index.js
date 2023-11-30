const express = require('express');
const path = require("path")
const { connectDb } = require('./db/connectDb');
const cors = require('cors');
const { userRouter } = require('./routes/user.routes');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { phoneRouter } = require('./routes/phone.routes');
// const bodyParser = require("body-parser")
const app = express();

const host = process.env.HOST;
const mongo_url = process.env.MONGO_URL;

app.use(express.static(path.resolve(__dirname,"..","dist")));

//middlewares
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser(process.env.ACCESS_TOKEN));
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

console.log(__dirname)


app.use('/user', userRouter);
app.use('/phone', phoneRouter);

app.use("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..","./dist/index.html"));
});

// app.get('/', (req, res) => {
//   res.send('hello world');
// });

startServer();

async function startServer() {
  await connectDb(mongo_url);
  app.listen(host, () => {
    console.log('lsiening at port 5173');
  });
}
