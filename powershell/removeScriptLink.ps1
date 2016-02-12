Write-Host "Importing O365 Commandlets..."
Import-Module OfficeDevPnP.PowerShell.V16.Commands -WA 0

Write-Host "Connecting to SP Site..."
Connect-SPOnline -url $args[0]

Write-Host "Removing Script link..."
Remove-SPOJavaScriptLink -Name $args[1] -Force