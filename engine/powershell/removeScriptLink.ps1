#. Utilities.ps1
. "$(Split-Path -Path $MyInvocation.MyCommand.Definition -Parent)\Utilities.ps1";  

ConnectToSharePoint -siteUrl $args[0]

Write-Host "Removing Script link..."
Remove-SPOJavaScriptLink -Name $args[1] -Force