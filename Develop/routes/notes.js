const notes = require("express").Router();
const path = require('path');


notes.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`)
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});
console.log("router notes.js here");

module.exports = notes;