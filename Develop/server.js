const express = require('express');
const fs = require('fs');
const path = require('path');
const { clog } = require('./middleware/clog');
const { readAndAppend, readAndUpdate,readAndDelete } = require('./helpers/fsUtils');

// const api = require('./routes/index.js');
const app = express();

const PORT = process.env.port || 3001;

app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/', api);
app.use(express.static('./public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`)
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', (req, res) => {
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

app.post('/api/notes', (req, res) => {
    console.info("add new data in server",req.body);
    // if(title && text &&){
        readAndAppend(req.body,'./db/db.json',res)
        // res.status(200).send("new data has been added")
    // }else{
    // res.status(400).sned("Bad user request")
    // }
});

app.put('/api/notes/:id', (req, res) => {
    console.info("updated data in server",req.body);
    console.log("req.params.id",req.params.id);
    readAndUpdate(req.params.id,req.body,'./db/db.json',res)
});

app.delete('/api/notes/:id', (req, res) => {
    console.log("delete data in server");
    console.log("req.params.id",req.params.id);
    readAndDelete(req.params.id,req.body,'./db/db.json',res)
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}/notes 🚀`)
);