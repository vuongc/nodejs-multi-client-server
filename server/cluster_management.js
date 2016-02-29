const os       = require('os');
const path     = require('path')
const cluster  = require('cluster');

var initCluster = function() {
  cluster.setupMaster({
    exec: path.join(__dirname, '/modules/hello_world.js')
  });

  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('listening', (worker, address) => {
    console.log(`A worker is now connected to ${address.address}:${address.port}`);
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    // console.log('Starting a new worker');
    // cluster.fork();
  });
};

var createWorkerFromClient = function() {
  if (cluster.workers.length === undefined
    || cluster.workers.length < os.cpus().length) {
    console.log('fork cluster', cluster.workers);
    cluster.fork();
  }
};

var displayWorkers = function() {
  console.log('workers are ', cluster.workers);
};

module.exports = {
  initCluster,
  createWorkerFromClient,
  displayWorkers
};
