import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from "cors"
import bodyParser from "body-parser";


//Router
import AuthRoute from './routes/Authroute.js'
import UserRoute from './routes/Userroute.js'
import PostRoute from './routes/Postroute.js'

const app = express();
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())
const PORT = process.env.PORT
mongoose
    .connect(
        process.env.MONGODB_CONNECTION
        , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`listening on ${PORT}:
Database connected `)))
    .catch((error) => console.log(`${error} did not connect`))

//Usage of routes

app.use('/auth', AuthRoute)
app.use("/user", UserRoute)
app.use('/post', PostRoute)