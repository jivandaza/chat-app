import express from 'express';
import cors from 'cors';
import cookiesParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from "url";
import { config } from "dotenv";
import connectDB from './config/connectDB.js';
import router from './routes/index.js';
config();
import { app, server } from './socket/index.js';

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));
app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;
const __dirname = fileURLToPath(new URL(".", import.meta.url));

app.use('/api', router);

app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
});

connectDB().then(()=> {
    server.listen(PORT , () => {
        console.log('Servidor corriendo en el puerto: ', PORT);
    });
});