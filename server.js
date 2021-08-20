'use strict';

const fs = require('fs');
const bodyparser = require('body-parser');

const express = require('express');
const server = express();

const path = require('path');
const hbs = require('express-handlebars');

server.use('/assets', express.static(process.cwd() + '/assets'));
server.use(bodyparser.urlencoded({ extended: false }));
server.use(bodyparser.json());

// ********** view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', '.hbs');

server.engine('.hbs', hbs({
  extname: '.hbs',
  defaultView: 'default',
}));

// *********** routes
server.get('/', (req, res) => {
  res.render('index', { layout: false });
})

// ****** App Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, function () {
  console.log('app started at port '+ PORT);
});

