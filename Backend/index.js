const express = require('express');
const app = express();
var router = require('./routes/route');
// const bodyParser = require('body-parser')
const Schema = require('./config/schema');
const db = require('./config/db')
const cors = require('cors');
app.use(cors());


db ();

app.use(express.json({}));

const PORT = 8000

app.use('/tasks', router);

app.listen(PORT, ()=> {
    console.log(`Server is conncted on port ${PORT}`);
})