var getCmd = function(message) {
  // var regexp = new RegExp("^\/([\w]*)(?:[\s]*)([\w]*)(?:[\s]+)*([\w\W]*)");
  var regexp = /^\/([\w]*)(?:[\s]*)([\w\S]*)(?:[\s]+)*([\w\W]*)/;
  var res;
  if ((res = regexp.exec(message)) !== null) {
    var tokens = {
      cmd: res[1],
      param: res[2],
      message: res[3]
    };
  }
  return tokens;
};
