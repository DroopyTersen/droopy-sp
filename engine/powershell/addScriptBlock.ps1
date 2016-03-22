#. Utilities.ps1
. "$(Split-Path -Path $MyInvocation.MyCommand.Definition -Parent)\Utilities.ps1";  


ConnectToSharePoint -siteUrl $args[0]

Write-Host "Adding Script Block..."
Write-Host $args[2]
Add-SPOJavaScriptBlock -Name $args[1] -Script $args[2]
Write-Host "SUCCESS!"
