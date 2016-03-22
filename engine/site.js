var scriptActions = require("./scriptActions");
var helpers = require("./helpers");
var path = require("path");

var site = function(siteUrl) {
	var url = siteUrl || throw "You need to pass a site url to engine.site('<siteurl>')";
	
	var inject = function(filepath, opts) {
		opts.file = filepath || throw "Invalid options. You need to pass filepath site(<siteUrl>).inject(<filepath>, [opts])";
		fileServer.start(opts, url => {
			// get the ngroked url of the file
			var fileUrl = helpers.getFileUrl(url, opts.file);
			addScriptAction(opts, fileUrl);
		});
	};

	var addScriptAction = function(fileUrl, opts) {
		if (!fileUrl ) throw "Invalid options. You need to pass fileUrl to site(<siteUrl>).addScriptAction(<fileUrl>, [opts])";
		
		//set the SharePoint url option to what was used to instantiate engine.site()
		opts.url = url;

		// based on file type, figure out what to do
		var extension = path.extname(fileUrl);
		if (extension === ".js") {
			scriptActions.addScriptLink(opts, fileUrl);
		} else if (extension === ".css") {
			// create js snippet that injects a css link tag
			var block = helpers.getStylesheetBlock(fileUrl);
			scriptActions.addScriptBlock(opts, block);
		}
	};

	return { inject, addScriptAction };	
};



module.exports = site;