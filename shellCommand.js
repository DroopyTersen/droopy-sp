#!/usr/bin/env node
var engine = require("./engine");
var program = require('commander');

program
	.version('0.0.2')
	.option('-u, --url <url>', 'REQUIRED - The SharePoint online url')
	.option('-p, --path <file>', 'REQUIRED - The url or local filepath to the file')
	.option('-a, --action <action>', 'REQUIRED - "inject" or "upload"')
	.option('-f, --folder <folder>', 'The site relative folder to upload the file to.')
	.option('-n, --name <name>', 'Name of the custom action')
	.parse(process.argv);

// A file and a sharepoint url were passed in
if (program.file && program.url) {
	program.action = program.action || "inject";
	program.folder = program.folder || "Style Library/_spbrander";
	program.name = program.name || "spbrander-cli";
	engine.site(program.url)[program.action](program.file, program.folder);
}