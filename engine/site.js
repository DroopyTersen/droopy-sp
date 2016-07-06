var helpers = require("./helpers");
var path = require("path");
var psCommands = require("./psCommands");
var page = require("./page");
var fs = require("fs");

var site = function(url, version = "v16" ) {
	var _site = { url, version };
	_site.commands = [ psCommands.connectToSharePoint(_site.url, _site.version) ];
	_site.inject = (fileUrl, name, scope, folder) => {
		// Allow for site relative paths
		fileUrl = helpers.getFilePath(fileUrl, _site.url);

		// if its a local file path, first create an upload command
		if (!helpers.isUrl(fileUrl)) {
			folder = folder || "Style Library/_spbrander";
			_site.upload(fileUrl, folder);
			fileUrl = helpers.getFileUrl(fileUrl, _site.url, folder);
		}

		var extension = path.extname(fileUrl);
		if (extension === ".js") {
			_site.commands.push(psCommands.addScriptLink(fileUrl, name, scope));
		} else if (extension === ".css") {
			_site.commands.push(psCommands.addCSSLink(fileUrl, name, scope));
		}
		return _site
	}

	_site.upload = (filePath, folder) => {
		filePath = helpers.getFilePath(filePath);
		if (fs.existsSync(filePath)) {
			_site.commands.push(psCommands.uploadFile(filePath, folder));
		} else {
			console.log("ERROR: Could not find local file to upload: " + filePath);
		}
		return _site;
	}

	_site.page = (url) => page(url, _site)

	_site.remove = (name) => {
		_site.commands.push(psCommands.removeCustomAction(name));
		return _site;
	}
		
	_site.execute = () => {
		var psBlock = _site.commands.join("\n");
		return helpers.runPowershellBlock(psBlock);
	}

	return _site;
}

module.exports = site;