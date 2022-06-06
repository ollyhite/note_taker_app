const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');

// const api = require('./routes/index.js');
const app = express();


const PORT = process.env.port || 3001;

app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/', api);
// app.use(express.static('../public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`)
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);