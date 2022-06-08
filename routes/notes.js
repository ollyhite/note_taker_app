const notes = require("express").Router();
const fs = require('fs');
const { readAndAppend, readAndUpdate,readAndDelete } = require('../helpers/fsUtils');
const { nanoid } = require("nanoid");
const moment = require('moment');
const currentDate = moment().format('MM/DD/YYYY');

notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`)
    fs.readFile("./db/db.json", 'utf8', (err, data) => {
        if (err) {
        console.error(err);
        } else {
        console.log(JSON.parse(data));
        res.status(200).json(JSON.parse(data))
        }
    });
});

notes.post('/', (req, res) => {
    const newId = nanoid();
    console.log("currentDate",currentDate);
    console.info("add new data in server",req.body);
    const newData = {...req.body,id:newId, date:currentDate}
    readAndAppend(newData,'./db/db.json',res)
});

notes.put('/:id', (req, res) => {
    console.log("currentDate",currentDate);
    console.info("updated data in server",req.body);
    const updateData = {...req.body, date:currentDate};
    console.log("updateData",updateData);
    console.log("req.params.id",req.params.id);
    readAndUpdate(req.params.id,updateData,'./db/db.json',res)
});

notes.delete('/:id', (req, res) => {
    console.log("delete data in server");
    console.log("req.params.id",req.params.id);
    readAndDelete(req.params.id,req.body,'./db/db.json',res)
});



console.log("router notes.js here");

module.exports = notes;