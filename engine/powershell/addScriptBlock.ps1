Write-Host "Importing O365 Commandlets..."
Import-Module OfficeDevPnP.PowerShell.V16.Commands -WA 0

Write-Host "Connecting to SP Site..."
#$user = $args[3]
#$password = ConvertTo-SecureString $args[4] -AsPlainText -Force
#$cred = new-object -typename System.Management.Automation.PSCredential -argumentlist $user, $password
Connect-SPOnline -url $args[0] #-Credentials $cred

Write-Host "Adding Script Block..."
Write-Host $args[2]
Add-SPOJavaScriptBlock -Name $args[1] -Script $args[2]
Write-Host "SUCCESS!"
