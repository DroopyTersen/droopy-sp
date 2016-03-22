#!/usr/bin/env node
var engine = require("./engine");
var program = require('commander');

program
	.version('0.0.2')
	.option('-u, --url <url>', 'REQUIRED - The SharePoint online url')
	.option('-f, --file <file>', 'REQUIRED - The path(relative or absolute or url) to the file')
	.parse(process.argv);

// A file and a sharepoint url were passed in
if (program.file && program.url) {
	// the file is a url, add the script action (don't inject)
	if (program.file.toLowerCase().indexOf("http:") === 0) {
		engine.site(program.url).addScriptAction(program.file);
	} else {
		engine.site(program.url).inject(program.file);
	}
}