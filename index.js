var helpers = require("./helpers");

var addStylesheet = exports.addStylesheet = function(opts) {
	console.log(opts)
	if (!opts.file || !opts.url) throw "Invalid options. You need to pass --url and a --file"

	helpers.createServer(opts, (url) => {
		var cssUrl = helpers.getFileUrl(url, opts.file);
		console.log(cssUrl);
		var block = helpers.getStylesheetBlock(cssUrl);
		addScriptBlock(opts, block);
	})
};

var addScriptBlock = exports.addScriptBlock = function(opts, block) {
	if (!block || !opts.url) throw "Invalid options. You need to pass --url and a file"
	opts.type = "Block";
	helpers.addScriptAction(opts, block)
};


var addScriptLink = exports.addScriptLink = function(opts) {
	console.log(opts)
	if (!opts.file || !opts.url) throw "Invalid options. You need to pass --url and --file"
	opts.type = "Link";
	helpers.createServer(opts, function(url) {
		var fileUrl = helpers.getFileUrl(url, opts.file);
		helpers.addScriptAction(opts, fileUrl);
	});
};

var removeScriptLink = exports.removeScriptLink = function(opts) {
	if (!opts.url) throw "Invalid options. You need to pass --url and --name"
	helpers.removeScriptAction(opts);
}

//addStylesheet({ url: "https://andrewpetersen.sharepoint.com", file:"test.css" })
//addScriptLink({ url: "https://andrewpetersen.sharepoint.com", file:"test.js" })
//removeScriptLink({ url: "https://andrewpetersen.sharepoint.com", file:"test.js" })