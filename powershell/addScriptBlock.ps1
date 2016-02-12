Write-Host "Importing O365 Commandlets..."
Import-Module OfficeDevPnP.PowerShell.V16.Commands -WA 0

Write-Host "Connecting to SP Site..."
Connect-SPOnline -url $args[0]

Write-Host "Adding Script Block..."
Write-Host $args[2]
Add-SPOJavaScriptBlock -Name $args[1] -Script $args[2]