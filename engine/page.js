var helpers = require("./helpers");
var fileServer = require("./fileServer");
var open = require("open");
var path = require("path");
var escapeHtml = require('escape-html');
var fs = require("fs");
var urlUtil = require("url");

var page = function (siteUrl, pageUrl) {
	var url = siteUrl;
	var page = pageUrl;


	var inject = function (filepath, name, opts) {
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

	var getScriptContent = function (fileUrl, opts) {
		var html = `
			<div id='${opts.name}-container'></div>
			<script type='text/javascript' src='${fileUrl}'></script>
		`;
		return '"' + escapeHtml(html.trim()) + '"';
		// } else if (extension === ".html" && opts.file) {
		// 	fs.readFile(opts.file, 'utf8', (err, data) => {
		// 		var urlInfo = urlUtil.parse(fileUrl);
		// 		var host = "https://" + urlInfo.host;
		// 		data = data.replace(/\{\{host\}\}/g, host);
		// 		done('"' + escapeHtml(data) + '"');	
		// 	});
		// }
	};

	var updateHtmlReferences = function (fileUrl, opts, done) {
		if (opts.file) {
			fs.readFile(opts.file, 'utf8', function (err, data) {
				if (err) return console.log(err);
				var urlInfo = urlUtil.parse(fileUrl);
				var host = "https://" + urlInfo.host;
				var result = data.replace(/(https:\/\/\w+.ngrok.io|\{\{host\}\})/g, host);

				fs.writeFile(opts.file, result, 'utf8', function (err) {
					if (err) return console.log(err);
					done(result);
				});
			});
		}
	};
	
	var addWikiWebPart = function (fileUrl, opts) {
		if (!fileUrl) throw "Invalid options. You need to pass fileUrl ";
		opts = opts || {};
		opts.name = opts.name || "droopy-sp-webpart";

		if (opts.cleanup !== false) opts.cleanup = true;
		if (opts.open !== false) opts.open = true;

		console.log("Adding Script Editor referencing " + fileUrl);
		var extension = path.extname(fileUrl);
		if (extension === ".js") {
			var content = getScriptContent(fileUrl, opts);

			helpers.runPowershellScript("AddScriptEditor.ps1", [url, page, content, opts.name], () => {
				if (opts.open) open(url + "/" + page);
			})
		} else if (extension == ".html") {
			updateHtmlReferences(fileUrl, opts, () => {
				helpers.runPowershellScript("AddHtmlWebpart.ps1", [url, page, fileUrl, opts.name], () => {
					if (opts.open) open(url + "/" + page);
				});				
			});
		}

	}

	//alias inject as debug
	return { inject, debug: inject, addWikiWebPart }
};

module.exports = page;

