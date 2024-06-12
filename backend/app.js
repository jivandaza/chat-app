import express from 'express';
import cors from 'cors';
import cookiesParser from 'cookie-parser';
import { config } from "dotenv";
import connectDB from './config/connectDB.js';
import router from './routes/index.js';

config();

const app = express();

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));
app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.json({
        message: 'Servidor corriendo en el puerto: ' + PORT
    });
});

app.use('/api', router);

connectDB().then(()=> {
    app.listen(PORT , () => {
        console.log('Servidor corriendo en el puerto: ', PORT);
    });
});