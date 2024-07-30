const express = require('express');
const fs = require('fs');
const path = require('path');
// need to find npm package that will give each note a unique id when it's saved

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:  true}));
app.use(express.static('public'));


//HTML Routes

// API Routes


// how to add the DELETE route from the frontend to the app