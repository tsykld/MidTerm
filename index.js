import express from 'express';
import RootRouterV1 from './routes/index.js';
import mongoose from 'mongoose';


import dotenv from "dotenv";
dotenv.config();

await mongoose.connect(process.env.MONGODB);

const app = express();
app.use(express.json());

app.use('/api/v1', RootRouterV1)

app.listen(4000, () => {
    console.log('Server is running.');
})