import express from 'express';
import cors from 'cors';
import { ENV } from './configs/env.js';

const PORT = ENV.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.send('API is running...');
});

app.get('/api/v1/health', (req,res) => {
    res.status(200).json({status: 'OK', message: 'Server is healthy'});
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})