var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var path = require('path');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
//View Engine: HandleBars
//
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  defaultLayout: 'index'
}));
app.set('view engine', 'handlebars');

//Connect to local mongo database
mongoose.connect('mongodb://localhost/expressapi');

//use api for each route
var routes = require('./routes/index');
app.use('/api/routes', routes);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log('Server started on port ' + app.get('port'));
});
