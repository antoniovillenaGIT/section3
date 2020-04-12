const express = require('express');
const Joi = require('joi'); // returns a class
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const courses = require('./routes/courses');
const home = require('./routes/home');
const logger = require('./middleware/logger');

const app = express();

// Template engine
app.set('view engine','pug');
app.set('views', './views'); // where we put the templates

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

app.use(express.json()); // request a piece of middleware
app.use(express.static('public')); // create a static folder
app.use(helmet());
app.use(logger);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

// This is set from env viariable NODE_ENV
// development, production, staging
if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan logging enabled');
}

// routes
app.use('/api/courses', courses);
app.use('/', home);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
