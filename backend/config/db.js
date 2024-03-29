var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://localhost/clube_de_robotica_db';
const config = require('./config');

if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGO_URL;
}

mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});
process.on('SIGTERM', function () {
  gracefulShutdown('Clube de Robotica app termination', function () {
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS
require('../models/administrador');
