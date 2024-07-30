const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:  true}));
app.use(express.static('public'));


//HTML Routes
app.get('/notes', (req, res) =>
    res.sendFile(path.join (__dirname, '/public/notes.html'))
);

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// API Routes


app.listen(PORT, () =>
    console.log(`App listening at https://localhost:${PORT}` )
);

// how to add the DELETE route from the frontend to the app