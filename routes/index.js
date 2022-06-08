const express = require("express");
const notesRouter = require('./notes')
const app = express();

app.use("/notes", notesRouter);
console.log("router index.js here");
module.exports = app;
