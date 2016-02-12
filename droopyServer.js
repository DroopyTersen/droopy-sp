var cmdProcess = require("./cmdProcess");
var request = require("request-promise");
var qrcode = require('qrcode-terminal');
var ngrokApiUrl = "http://127.0.0.1:4040/api/tunnels";
var liveServer = require("live-server");
var open = require("open");

var getTunnelUrl = function(done) {
    setTimeout(() => {
        request({
            url: ngrokApiUrl,
            json: true
        }).then(data => {
            if (data.tunnels && data.tunnels.length > 1) {
                done(data.tunnels[1].public_url);
            } else {
                getTunnelUrl(done);
            }
        }).catch(e => {
            getTunnelUrl(done);
        })
    }, 1000);
};

var startLiveServer = function(port) {
    var params = { port, open:false };
    liveServer.start(params);
};

var startNgrok = function(port, done) {
    var ngrokPath = __dirname + "\\node_modules\\ngrok\\bin\\ngrok.exe";
    var ngrokArgs = ["http", port];
    var ngrokProcess = cmdProcess.create(ngrokPath, ngrokArgs);
    getTunnelUrl(done);
};

var generateQRCode = function(url) {
    if (url) {
        qrcode.generate(url, (qr) => console.log(qr));
    } else {
        console.log("QR Code Error: No url given");
    }
};

var start = function(port, opts, done) {
    if (opts.server) startLiveServer(port, opts);

    startNgrok(port, (url) => {
        console.log(url);
        if (opts.qrcode) generateQRCode(url);
        if (opts.open !== false) open(url);
        
        done(url);
    })

    return {
        stop: () => ngrokProcess.kill()
    };
};

module.exports = {
    start
};