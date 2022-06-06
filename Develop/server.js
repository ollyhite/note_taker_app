const express = require('express');
const fs = require('fs');
const path = require('path');
const { clog } = require('./middleware/clog');
const dbData = require("./db/db.json");
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
    res.json(dbData)
});

app.post('/api/notes', (req, res) => {
    console.info("update data in server",req.body);
    const newdata = [...dbData, req.body];
    fs.writeFile(`./db/db.json`, JSON.stringify(newdata), (err) =>
        err
            ? console.error(err)
            : console.log(
                `db data has been written to JSON file`
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
                `db data has been written to JSON file`
            )
    );
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}/notes 🚀`)
);