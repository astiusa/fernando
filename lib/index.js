/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var swig = require('swig');

var api = {};
module.exports = api;

api.init = function init(options) {
  options = options || {};
  var app = express();
  api.app = app;
  
  app.configure(function(){
    app.set('port', options.port || process.env.PORT || 4000);
    app.set('views', path.join(__dirname, '../site/views'));
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, '../site/static/')));
    app.get('/ping', routes.ping);
    app.get('/', function(req, res) {
      res.render('index.html');
    });
  });

  app.configure('development', function(){
    app.use(express.errorHandler());
  }); 
}


api.start = function start() {
  if (!api.app) {
    throw new Error('Init not completed');
  }
  api.server = api.app.listen(api.app.get('port'));
};

api.stop = function stop() {
  if (api.server) {
    api.server.stop();
    setTimeout(function() {
      process.exit();
    }, 1000);
  }
};