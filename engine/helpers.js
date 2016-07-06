var path = require("path");
var PowerShell = require('node-powershell');

var getFileUrl = exports.getFileUrl = function(filepath, siteUrl, folder) {
	var filename = path.basename(filepath);
	if (folder.startsWith("/")) folder = folder.substr(1);
	return `${siteUrl}/${folder}/${filename}`
};

var isUrl = exports.isUrl = function(filepath) {
	return filepath.startsWith("http");
};

var getFilePath = exports.getFilePath = function(file, siteUrl) {
	// if its a URL or an absolute filepath
	if (file.startsWith("http") || !file.startsWith("/") && path.isAbsolute(file)) {
		return file;
	}
	// if its a relative filepath
	if (file.startsWith("./")) {
		return path.format({dir: process.cwd(), base: path.normalize(file)});
	}
	// Assume its a site relative url
	if (file.startsWith("/")) file = file.substr(1);
	return `${siteUrl}/${file}`
};

exports.runPowershellBlock = function(scriptBlock, done) {
	return new Promise((resolve, reject) => {
		var psCommand = new PowerShell(scriptBlock);
		psCommand.on('output', data => console.log(data));
		psCommand.on('end', resolve);
		psCommand.on('error', reject);
	});
};
