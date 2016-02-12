#!/usr/bin/env node
var spBrander = require("./index");
var program = require('commander');
var path = require("path");

program
	.version('0.0.1')
	.option('-u, --url <url>', 'REQUIRED - The SharePoint online url')
	.option('-f, --file <file>', 'REQUIRED - The relative path to the file')
	.option('-r, --remove', 'Remove the specified CustomAction ScriptLink name at the targeted url')
	.option('-n, --name <>', 'Optional - Create the CustomAction with a specific name')
	.parse(process.argv);

var name = typeof program.name === 'string' ? program.name : "";
if (program.file) {
	var extension = path.extname(program.file);

	var opts = {
		url: program.url,
		file: program.file,
		name: name
	}

	if (extension === ".js") {
		spBrander.addScriptLink(opts);
	} else if (extension === ".css") {
		spBrander.addStylesheet(opts);
	}

} else if (program.remove) {
	spBrander.removeScriptLink({
		url: program.url,
		name: name
	});
}