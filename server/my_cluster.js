const cppModule = require('./modules/hello_world/build/Release/binding');
const cluster = require('./cluster_management');

process.send(cppModule.hello());
