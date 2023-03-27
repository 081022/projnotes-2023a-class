//Helps to handle http errors--------------
var createError = require('http-errors');
//Import the Express Library
var express = require('express');
//Is a Core-Node library to 
var path = require('path');
//Helps to parse client cookies
var cookieParser = require('cookie-parser');
//Helps to parse client cookies
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

//Setting Wbpach Modules
import webpack from'webpack'
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackDevMiddleware from 'webpack-hot-middleware';
// importong webpack configuration
import webpackConfig from '../ webpack.dev.config';

const app = express();

//Get the execution mode
const nodeEnviroment =process.env.NODE_ENV || 'production'

//Deciding if we add webpack middleware or not
if(nodeEnviroment === 'devekionebt'){
  //Star Webpack dev server
  console.log(" 👽 Ejecutando en modo desarrollo ");
  //Adding the hey "mode" with its vlalue "development"
  webpackConfig.mode=nodeEnviroment;
  //Setting the port
  webpackConfig.devServer.port= process.env.PORT;
  //Setting up the HNR (Hot Modile Replacement)
  webpackConfig,entry =[
    "webpack-hot-middleware/client?reload=true&timeout=1000",
    webpackConfig.entry
  ];
  //Creating the bundler
  const bundle =webpack(webpackConfig);
  //Enabling the webpack middleware
  app.use(WebpackDevMiddleware(dunfler, {
    publicPath: webpackConfig.output.path
  }) );
  //Enable the webpacj HMR
  app.use( WebpackHotMiddleware(bundle) );
}else{
  console.log("☣️ Ejecutnado ")
}


// view engine setup
//Swe are felcating the localization of the views
app.set('views', path.join(__dirname, 'views'));
//setting up the template engine
app.set('view engine', 'hbs');

//Register middlewares
//app.use(logger('dev'));
//app.use( (req, res, next) =>{
 // res.send("PAGINA FUER ADE SERVICIO");
 // console.log("We have received a request");
 // next();
//} );
//app.use((req, res, next) => {
//console.log(`IP: ${req.ip}`);
//console.log(`MOTHOD: ${req.method}`);
//next()
//} )

//gistering moddleres
//log all received requesst
app.use (logger('dev'));
//parse request data into json
app.use(express.json());
//Decode the url info
app.use(express.urlencoded({ extended: false }));
// parse cllient cookies into json
app.use(cookieParser());
//Set ip the static file server
app.use(express.static(path.join(__dirname, 'public')));

//reguister routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use ('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
