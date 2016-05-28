var path = require("path");
var helpers = require("./helpers");
var psCommands = require("./psCommands");
var fs = require("fs");

var page = function(serverRelativeUrl, site, isWiki = true) {
	var _page = { site, serverRelativeUrl, isWiki };
	
	_page.inject = function(filePath, name) {
		filePath = helpers.getFilePath(filePath);
		console.log(filePath);
		var extension = path.extname(filePath);
		if (extension === ".html") {
			// get html file contents and escape double quotes with back ticks for powershell
			var content = fs.readFileSync(filePath, { encoding: "utf-8" }).replace(/\"/g, "`\"");
			if (isWiki) {
				var removeWebPart = psCommands.removeWebPart(_page.serverRelativeUrl, name);
				var addWebpart = psCommands.addContentToWikiPage(_page.serverRelativeUrl, content, name);
				_page.site.commands.push(removeWebPart);
				_page.site.commands.push(addWebpart);
			}
		}

		return _page;
	}

	_page.end = () => _page.site;
	_page.execute = _page.site.execute;

	return _page;
}

module.exports = page;