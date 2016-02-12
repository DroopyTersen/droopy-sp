var childProcess = require('child_process');
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    
var create = function(cmd, args, outputCallback) {
        // if no output callback, use console.log
    outputCallback = outputCallback || ((data) => console.log("droopy-cmd: " + data));
    
    // spin it up
    // var cmd = spawn(app, initialArgs);
    var process = mySpawn(cmd, args);
    // output
    process.stdout.on('data', outputCallback);
    
    //log on exit
    process.on('exit', code => console.log('droopy-cmd exited with code ' + code))
    
    
    return {
        _process: process,
        write: (str) => process.stdin.write(str + '\n'),
        kill: () => process.stdin.end()
    }
}

module.exports = { create };