import express from 'express';
import cors from 'cors';
import { config } from "dotenv";
import connectDB from './config/connectDB.js';

config();

const app = express();

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.json({
        message: 'Servidor corriendo en el puerto: ' + PORT
    });
});

connectDB().then(()=> {
    app.listen(PORT , () => {
        console.log('Servidor corriendo en el puerto: ', PORT);
    });
});