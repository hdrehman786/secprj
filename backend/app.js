import express from 'express';
import { configDotenv } from 'dotenv';
import connectDB from './database/database.js';
import bodyParser from 'body-parser';
import router from './routes/userroute.js';
import todoRouter from './routes/todoroute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
configDotenv();

const app = express();
const port = process.env.PORT
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173/',
    credentials: true
}))
connectDB();

app.use(router)
app.use(todoRouter)
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})