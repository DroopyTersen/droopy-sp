#. Utilities.ps1
. "$(Split-Path -Path $MyInvocation.MyCommand.Definition -Parent)\Utilities.ps1";  

ConnectToSharePoint -siteUrl $args[0]

Write-Host "Adding Script link..."
Add-SPOJavaScriptLink -Name $args[1] -Url $args[2]