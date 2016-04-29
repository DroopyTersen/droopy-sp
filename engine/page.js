var helpers = require("./helpers");
var fileServer = require("./fileServer");
var open = require("open");
var path = require("path");
var escapeHtml = require('escape-html');
var fs = require("fs");
var urlUtil = require("url");

var page = function(siteUrl, pageUrl) {
	var url = siteUrl;
	var page = pageUrl;


	var inject = function(filepath, name, opts) {
		if (!filepath) throw "Invalid options. You need to pass filepath. engine.page(<siteUrl>, <pageUrl>).inject(<filepath>, [opts])"
		opts = opts || {};
		opts.name = name;
		opts.file = filepath;
		fileServer.start(opts, url => {
			// get the ngroked url of the file
			var fileUrl = helpers.getFileUrl(url, filepath).replace("http:", "https:");
			addWikiWebPart(fileUrl, opts);
		});
	};

	var getScriptContent = function(fileUrl, opts, done) {
				// based on file type, figure out what to do
		var extension = path.extname(fileUrl);
		if (extension === ".js") {
			var html = `
				<div id='${opts.name}-container'></div>
				<script type='text/javascript' src='${fileUrl}'></script>
			`;
			done('"' + escapeHtml(html.trim()) + '"');			
		} else if (extension === ".html" && opts.file) {
			fs.readFile(opts.file, 'utf8', (err, data) => {
				var urlInfo = urlUtil.parse(fileUrl);
				var host = "https://" + urlInfo.host;
				data = data.replace(/\{\{host\}\}/g, host);
				done('"' + escapeHtml(data) + '"');	
			});
		}
	};
	
	var addWikiWebPart = function(fileUrl, opts) {
		if (!fileUrl ) throw "Invalid options. You need to pass fileUrl ";
		opts = opts || {};
		opts.name = opts.name || "droopy-sp-webpart";

		if (opts.cleanup !== false) opts.cleanup = true;
		if (opts.open !== false) opts.open = true;

		console.log("Adding Script Editor referencing " + fileUrl);
		getScriptContent(fileUrl, opts, (content) => {
			helpers.runPowershellScript("AddScriptEditor.ps1", [url, page, content, opts.name], () =>{
				if (opts.open) open(url + "/" + page);
			})

			if (opts.cleanup) {
				var removeOpts = { url: opts.url, exit: true, name: opts.name, page: page };
				// process.on('SIGINT', removeScriptAction.bind(null, removeOpts));
			}			
		});

	}

	//alias inject as debug
	return {inject, debug: inject, addWikiWebPart}
};

module.exports = page;

