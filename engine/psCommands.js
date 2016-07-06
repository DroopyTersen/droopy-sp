exports.connectToSharePoint = function(url, version) {
	version = version || "v16";
	var commandStr = 
`. .\\node_modules\\skyline-sppowershell\\utilities.ps1
ConnectToSharePoint -siteUrl ${url} -version ${version}`
	
	return commandStr;
}

exports.addCSSLink = function(url, name, scope) {
	name = name || "droopy-sp-css";
	scope = scope || "Web"
	return `AddCSSLink -Name "${name}" -Url "${url}" -Scope ${scope} -Sequence 100`;
}

exports.addScriptLink = function(url, name, scope) {
	scope = scope || "Web"
	name = name || "droopy-sp-js";
	return `AddScriptLink -Name "${name}" -Url "${url}"  -Scope ${scope} -Sequence 100`;
}

exports.removeCustomAction = function(name) {
	return "RemoveCustomAction -Name " + name
}

exports.addContentToWikiPage = function(pageUrl, content, name) {
	return `Write-Host "Adding webpart '${name}' to ${pageUrl}..."
			AddContentToWikiPage -ServerRelativePageUrl "${pageUrl}" -Content "${content}" -WebPartTitle ${name}`
}

exports.addContentEditorToWikiPage = function(pageUrl, contentLink, name) {
	return `Write-Host "Adding webpart '${name}' to ${pageUrl}..."
			AddContentEditorToWikiPage -ServerRelativePageUrl "${pageUrl}" -ContentLink "${contentLink}" -WebPartTitle ${name}`
}
exports.removeWebPart = function(pageUrl, name) {
	return `Write-Host "Removing webpart '${name}' from ${pageUrl}..."
			Remove-SPOWebPart -ServerRelativePageUrl ${pageUrl} -Title ${name}`
}
    
exports.uploadFile = function(filePath, folder) {
	return `Write-Host "Uploading ${filePath} to ${folder}..."
			Add-SPOFile -Path "${filePath}" -Folder "${folder}" -Checkout`
}