import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/database.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT

const connectDB = async () => {
    try {
        await db.authenticate();
        console.log('Database berhasil dijalankan');
    } catch (error) {
        console.error('Database gagal terkoneksi:', error);
    }
};
connectDB();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

app.use(router);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
