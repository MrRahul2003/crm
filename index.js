import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from "body-parser";

import Conn from "./db/Conn.js";
import route from "./routes/Route.js";

dotenv.config();

const DB = process.env.DB;
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(bodyParser.json( {extended: true} ));
app.use(bodyParser.urlencoded( {extended: true} ));

app.use('/',route);
// app.use(require('./routes/routes'))

Conn();

app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`);
})
