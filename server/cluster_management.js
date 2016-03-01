const os       = require('os');
const path     = require('path')
const cluster  = require('cluster');
const io       = require('./config/socket');

var initCluster = function(server) {
  cluster.setupMaster({
    exec: './my_cluster.js'
  });

  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('listening', (worker, address) => {
    console.log(`A worker is now connected to ${address.address}:${address.port}`);
  });

  cluster.on('message', (msg) => {
    console.log('I receive a message ', msg);
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    // console.log('Starting a new worker');
    // cluster.fork();
  });
};

var createWorkerFromClient = function() {
  if (cluster.workers.length === undefined || cluster.workers.length < os.cpus().length) {
    var worker = cluster.fork();

    worker.on('message', (msg) => {
      io.sendMessageFromCluster(msg);
    });
  }
};

module.exports = {
  initCluster,
  createWorkerFromClient
};
