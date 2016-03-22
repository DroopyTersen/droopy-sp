#. Utilities.ps1
. "$(Split-Path -Path $MyInvocation.MyCommand.Definition -Parent)\Utilities.ps1";  

ConnectToSharePoint -siteUrl $args[0]

InjectScriptToWikiPage -serverRelativePageUrl $args[1] -scriptUrl $args[2] -webPartTitle $args[3]