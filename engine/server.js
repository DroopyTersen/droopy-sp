var droopyServer = require("droopy-server");
var path = require("path");

var start = exports.start = function(opts) {
	
	if (opts.file && path.isAbsolute(opts.file)) {
		opts.path = path.dirname(opts.file)
	} else if (!opts.path) {
		opts.path = process.cwd();
	}
	var serverOptions = {
		server: true,
		open: false,
		path: opts.path
	}
	return droopyServer.start(opts.port || 3002, serverOptions);
};