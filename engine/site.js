var helpers = require("./helpers");
var path = require("path");
var psCommands = require("./psCommands");
var page = require("./page");

var site = function(url, version = "v16" ) {
	var _site = { url, version };
	_site.commands = [ psCommands.connectToSharePoint(_site.url, _site.version) ];
	_site.inject = (fileUrl, name) => {
		
		//allow site relative paths
		if (!fileUrl.startsWith("http")) {
			fileUrl = _site.url + fileUrl;
		}

		var extension = path.extname(fileUrl);
		if (extension === ".js") {
			_site.commands.push(psCommands.addScriptLink(fileUrl, name));
		} else if (extension === ".css") {
			_site.commands.push(psCommands.addCSSLink(fileUrl, name));
		}
		return _site
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