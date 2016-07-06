var path = require("path");
var helpers = require("./helpers");
var psCommands = require("./psCommands");
var fs = require("fs");

var page = function(serverRelativeUrl, site, isWiki = true) {
	var _page = {
		site,
		serverRelativeUrl,
		isWiki
	};

	_page.inject = function(filePath, name) {
		filePath = helpers.getFilePath(filePath);

		//Clean up old instances first
		var removeWebPart = psCommands.removeWebPart(_page.serverRelativeUrl, name);
		_page.site.commands.push(removeWebPart);

		var extension = path.extname(filePath);

		if (extension === ".html") {
			filePath.startsWith("http") 
				? addContentEditor(_page, filePath, name) 
				: addHtmlContentScriptEditor(_page, filePath, name);
		}
		return _page;
	}

	_page.remove = (name) => {
		_page.site.commands.push(psCommands.removeWebPart(_page.serverRelativeUrl, name));
		return _page;
	}

	_page.end = () => _page.site;
	_page.execute = _page.site.execute;

	return _page;
}

var addContentEditor = function(page, fileUrl, name) {
	if (page.isWiki) {
		var addWebpart = psCommands.addContentEditorToWikiPage(page.serverRelativeUrl, fileUrl, name);
		page.site.commands.push(addWebpart);
	}
};

var addHtmlContentScriptEditor = function(page, filePath, name) {
	var content = fs.readFileSync(filePath, {
		encoding: "utf-8"
	}).replace(/\"/g, "`\"");

	if (page.isWiki) {
		var addWebpart = psCommands.addContentToWikiPage(page.serverRelativeUrl, content, name);
		page.site.commands.push(addWebpart);
	}
};

module.exports = page;