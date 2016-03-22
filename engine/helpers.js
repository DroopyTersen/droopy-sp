var droopyServer = require("droopy-server");
var path = require("path");
var PowerShell = require('node-powershell');
var open = require('open');


var getStylesheetBlock = exports.getStylesheetBlock = function(cssUrl) {
	var block = `
			var linkElem = document.createElement('link'); 
			linkElem.setAttribute('rel', 'stylesheet'); 
			linkElem.setAttribute('type', 'text/css'); 
			linkElem.setAttribute('href', '${cssUrl}'); 
			var head = document.querySelector('head');
			console.log('SPBRANDER INJECTING CSS');
			head.appendChild(linkElem);
	`;
	var block = block.replace(/\n/g, " ").replace(/\t/g, " ");
	return "\"" + block + "\"";
};


var getFileUrl = exports.getFileUrl = function(url, file) {
	var fileUrl = "";
	var fileInfo = path.parse(file);
	console.log(fileInfo);
	if (path.isAbsolute(file) ){
		fileUrl = "/" + fileInfo.base;
	} else {
		fileUrl = 	fileInfo.dir && fileInfo.dir !== "."
						? fileInfo.dir + "/" + fileInfo.base
						: "/" + fileInfo.base
	}
	console.log(fileUrl);
	return url.replace("http:/", "https:/") + fileUrl;
};

var runPowershellScript = exports.runPowershellScript = function(ps1Name, args, done) {
	var psCommand = new PowerShell(`${__dirname}\\powershell\\${ps1Name} ${args.join(" ")}`);
	psCommand.on('output', data => console.log(data));
	psCommand.on('end', () => {
		if(done) done()
	});
}