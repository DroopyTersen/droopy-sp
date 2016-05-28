exports.connectToSharePoint = function(url, version) {
	version = version || "v16";
	var commandStr = 
`. .\\node_modules\\skyline-sppowershell\\utilities.ps1
ConnectToSharePoint -siteUrl ${url} -version ${version}`
	
	return commandStr;
}

exports.addCSSLink = function(url, name) {
	name = name || "droopy-sp-css";
	return `AddCSSLink -Name "${name}" -Url "${url}" -Sequence 100`;
}

exports.addScriptLink = function(url, name) {
	name = name || "droopy-sp-js";
	return `AddScriptLink -Name "${name}" -Url "${url}" -Sequence 100`;
}

exports.removeCustomAction = function(name) {
	return "RemoveCustomAction -Name " + name
}

exports.addContentToWikiPage = function(pageUrl, content, name) {
	return `AddContentToWikiPage -ServerRelativePageUrl "${pageUrl}" -Content "${content}" -WebPartTitle ${name}`
}

exports.removeWebPart = function(pageUrl, name) {
	return `Remove-SPOWebPart -ServerRelativePageUrl ${pageUrl} -Title ${name}`
}