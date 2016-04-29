#. Utilities.ps1
. "$(Split-Path -Path $MyInvocation.MyCommand.Definition -Parent)\Utilities.ps1";  

ConnectToSharePoint -siteUrl $args[0]
Write-Host "Here i am"
InjectScriptToWikiPage -serverRelativePageUrl $args[1] -content $args[2] -webPartTitle $args[3]