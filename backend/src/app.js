const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json()); //indica que o body das requisições serão em JSON
app.use(routes);
app.use(errors());

module.exports = app;//app.listen(3333);