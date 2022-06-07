const notes = require("express").Router();
const fs = require('fs');

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`)
    res.json(dbData)
});

app.post('/api/notes', (req, res) => {
    console.info("add new data in server",req.body);
    const newdata = [...dbData, req.body];
    fs.writeFile(`./db/db.json`, JSON.stringify(newdata), (err) =>
        err
            ? console.error(err)
            : console.log(
                `new data has been added`
            )
    );
});

app.put('/api/notes/:id', (req, res) => {
    console.info("updated data in server",req.body);
    console.log("req.params.id",req.params.id);
    const newdbData = dbData.map(item =>
        item.id === req.params.id
            ? { ...item, title: req.body.title , text:req.body.text, color:req.body.color }
            : item
        );
    console.log(newdbData);
    fs.writeFile(`./db/db.json`, JSON.stringify(newdbData), (err) =>
        err
            ? console.error(err)
            : console.log(
                `data has been updated`
            )
    );
});

app.delete('/api/notes/:id', (req, res) => {
    console.log("delete data in server");
    console.log("req.params.id",req.params.id);
    const idToRemove = req.params.id;
    const removeItem = dbData.filter((item) => item.id !== idToRemove);
    console.log("removeItem",removeItem);
    fs.writeFile(`./db/db.json`, JSON.stringify(removeItem), (err) =>
        err
            ? console.error(err)
            : console.log(
                `data has been detele`
            )
    );
});
console.log("router notes.js here");

module.exports = notes;