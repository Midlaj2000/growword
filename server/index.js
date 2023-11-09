import express from "express";
import axios from "axios";
import cheerio from 'cheerio';
import dbConnect from "./config/dbConnect.js";
import cors from 'cors';
import { addFavourite, deleteSingleItem, fetchAllDatas, removeFavourite, viewAllSearches } from "./controllers/dataController.js";

dbConnect();


const app = express();

app.use(cors({
    origin: 'https://growword-frontent.vercel.app/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(express.json()); // Use built-in express.json() middleware


app.get('/', (req, res) => {
    res.send("Welcome");
});

app.post('/api/data', fetchAllDatas);
app.get('/api/data', viewAllSearches);
app.put('/api/data/addFavourite', addFavourite);
app.put('/api/data/removeFavourite', removeFavourite);
app.delete('/api/data', deleteSingleItem);

// Generic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

const port = process.env.PORT || 3100;
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});
