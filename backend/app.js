var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var knex = require('../backend/db/dbconfig')
var cors = require('cors')
const app = express()
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  console.log("app started!!");
})
module.exports = app;
