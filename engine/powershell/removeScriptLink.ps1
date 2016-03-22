Write-Host "Importing O365 Commandlets..."
Import-Module OfficeDevPnP.PowerShell.V16.Commands -WA 0

Write-Host "Connecting to SP Site..."
#$user = $args[2]
#$password = ConvertTo-SecureString $args[3] -AsPlainText -Force
#$cred = new-object -typename System.Management.Automation.PSCredential -argumentlist $user, $password
Connect-SPOnline -url $args[0] #-Credentials $cred

Write-Host "Removing Script link..."
Remove-SPOJavaScriptLink -Name $args[1] -Force