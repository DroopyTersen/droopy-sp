var path = require("path");
var PowerShell = require('node-powershell');

var getFileUrl = exports.getFileUrl = function(url, file) {
	var fileUrl = "";
	var fileInfo = path.parse(file);
	if (path.isAbsolute(file) ){
		fileUrl = "/" + fileInfo.base;
	} else {
		fileUrl = 	fileInfo.dir && fileInfo.dir !== "."
						? fileInfo.dir + "/" + fileInfo.base
						: "/" + fileInfo.base
	}
	if (fileUrl[0] === ".") fileUrl = fileUrl.substr(1);
	return url.replace("http:/", "https:/") + fileUrl;
};

var getFilePath = exports.getFilePath = function(file) {
	return process.cwd() + file;
}
exports.runPowershellBlock = function(scriptBlock, done) {
	return new Promise((resolve, reject) => {
		var psCommand = new PowerShell(scriptBlock);
		psCommand.on('output', data => console.log(data));
		psCommand.on('end', resolve);
		psCommand.on('error', reject);
	});
};
