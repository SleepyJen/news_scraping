const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connection = mongoose.connection;
const color = require('colors');
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/newsDB"

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connection.on('error', () => console.log('connection error'));

connection.once('open', () => {
    console.log('Connected to database');
    console.log('-----------------------\n'.rainbow);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});