var electron   = require('electron-prebuilt');
var path       = require('path');
var proc       = require('child_process');

// Launch the electron application through express
proc.spawn(electron, [ process.cwd() + path.sep + "electron_app" + path.sep ]);
