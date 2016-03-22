var helpers = require("./helpers");
var fileServer = require("./fileServer");
var open = require("open");

var page = function(siteUrl, pageUrl) {
	var url = siteUrl;
	var page = pageUrl;

	var inject = function(filepath, name, opts) {
		if (!filepath) throw "Invalid options. You need to pass filepath page(<siteUrl>, <pageUrl>).inject(<filepath>, [opts])"
		opts = opts || {};
		opts.name = name;
		opts.file = filepath;
		fileServer.start(opts, url => {
			// get the ngroked url of the file
			var fileUrl = (url + filepath).replace("http:", "https:");
			addWikiWebPart(fileUrl, opts);
		});
	}

	var addWikiWebPart = function(fileUrl, opts) {
		if (!fileUrl ) throw "Invalid options. You need to pass fileUrl ";
		opts = opts || {};
		opts.name = opts.name || "droopy-sp-webpart";

		if (opts.cleanup !== false) opts.cleanup = true;
		if (opts.open !== false) opts.open = true;

		console.log("Adding Script Editor referencing " + fileUrl);
		helpers.runPowershellScript("AddScriptEditor.ps1", [url, page, fileUrl, opts.name], () =>{
			if (opts.open) open(url + "/" + page);
		})

		if (opts.cleanup) {
			var removeOpts = { url: opts.url, exit: true, name: opts.name, page: page };
			// process.on('SIGINT', removeScriptAction.bind(null, removeOpts));
		}
	}

	return {inject, addWikiWebPart}
};

module.exports = page;

