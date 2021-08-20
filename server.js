'use strict';

const fs = require('fs');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const key = require("./config/key");

const express = require('express');
const app = express();

const path = require('path');
const hbs = require('express-handlebars');
const Request = require("./models/Request");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, authorization, Authorization, Authentication, x-access-token");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
// ********** view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.engine('.hbs', hbs({
  extname: '.hbs',
  defaultView: 'default',
}));

// *********** routes
app.get('/', (req, res) => {
  res.render('index', { layout: false });
})

app.post('/submitContactForm', async (req, res) => {
  const { name, email, message } = req.body;

		try {

      await Request.create({
				name,
				email,  
				message,
			});
		
      res
				.status(200)
				.json({ success:true, message: 'Submitted successfully' });
		} catch (error) {
			res.status(500).json({ success:false, message:"error" });
		}
})

mongoose.Promise = global.Promise;

mongoose
	.connect(key.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch((err) => console.log(err));

// ****** App app
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log('app started at port '+ PORT);
});

