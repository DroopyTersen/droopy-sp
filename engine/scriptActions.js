var helpers = require("./helpers");
var open = require("open");

var addScriptBlock = exports.addScriptBlock = function(opts, block) {
	opts.type = "Block";
	addScriptAction(opts, block)
};

var addScriptLink = exports.addScriptLink = function(opts, block) {
	opts.type = "link";
	addScriptAction(opts, block)
};

var removeScriptAction = exports.removeScriptAction = function(opts, done) {
	if (opts.exit) console.log("Cleaning up script link...");
	
	// Handle defaults
	opts.name = opts.name || "droopy-sp";
	helpers.runPowershellScript(`removeScriptLink.ps1`, [opts.url, opts.name, opts.user, opts.pwd], () => {
		if (opts.exit) process.exit();
		if (done) done()
	});
};

//Allws adding a ScriptLink or a ScriptBlock
var addScriptAction = exports.addScriptAction = function(opts, script) {
	// Handle defaults
	opts.type = opts.type || "Link";
	opts.name = opts.name || "droopy-sp"
	
	if (opts.cleanup !== false) opts.cleanup = true;
	if (opts.open !== false) opts.open = true;

	console.log("Adding Custom Action named: " + opts.name);
	helpers.runPowershellScript(`addScript${opts.type}.ps1`, [opts.url, opts.name, script, opts.user, opts.pwd], () =>{
		if (opts.open) open(opts.url);
	});

	if (opts.cleanup) {
		var removeOpts = { url: opts.url, exit: true, type: opts.type, user: opts.user, pwd: opts.pwd }
		process.on('SIGINT', removeScriptAction.bind(null, removeOpts));
	}
};
