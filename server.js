const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const logger = require('morgan');

require('dotenv').config();
require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

//middleware setup
app.use(logger('dev'));
app.use(express.json());

// serve favicon
app.use(favicon(path.join(__dirname, 'build', 'booksfav.png')));

// serve up express static files
app.use(express.static(path.join(__dirname, 'build')));

// api routes
app.use(require('./config/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/books', require('./routes/api/books'));
app.use('/api/reviews', require('./routes/api/reviews'));

//catch all route 
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});





app.listen(PORT, () => console.log(`listenning on port ${PORT}`));