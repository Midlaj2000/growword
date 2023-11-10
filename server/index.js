import express from "express";
import axios from "axios";
import cheerio from 'cheerio';
import dbConnect from "./config/dbConnect.js";
import cors from 'cors';
import { addFavourite, deleteSingleItem, fetchAllDatas, removeFavourite, viewAllSearches } from "./controllers/dataController.js";

dbConnect();


const app = express();

const allowedOrigins = [
  'https://your-frontend-deployment-url.com',
  'https://another-frontend-url.com',
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
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
