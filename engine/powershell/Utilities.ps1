$path = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
Write-Host $path

Function InjectScriptToWikiPage($serverRelativePageUrl, $scriptUrl, $webPartTitle, $row = 1, $column = 1)
{
    #$webPartXml = (Get-Content -Path .\ScriptWebPartTemplate.webpart -Raw)
    $path2 = $path + "\ScriptWebpartTemplate.webpart"
    Write-Host $path2
    $webPartXml = (Get-Content -Path $path2 -Raw)
    $webPartXml = $webPartXml -Replace "{{ScriptUrl}}", $scriptUrl
    $webPartXml = $webPartXml -Replace "{{ScriptWebPartTitle}}", $webPartTitle
    
    Add-SPOWebPartToWikiPage -ServerRelativePageUrl $serverRelativePageUrl -Xml $webPartXml -Row $row -Column $column
}

Function InjectScriptToPublishingPage($serverRelativePageUrl, $scriptUrl, $webPartTitle, $zoneId = "Header", $zoneIndex = 1)
{
    #$webPartXml = (Get-Content -Path .\ScriptWebPartTemplate.webpart -Raw)
    $webPartXml = (Get-Content -Path "$(Split-Path -Path $MyInvocation.MyCommand.Definition -Parent)\ScriptWebPartTemplate.webpart" -Raw)
    $webPartXml = $webPartXml -Replace "{{ScriptUrl}}", $scriptUrl
    $webPartXml = $webPartXml -Replace "{{ScriptWebPartTitle}}", $webPartTitle
        
    Add-SPOWebPartToWebPartPage -ServerRelativePageUrl $serverRelativePageUrl -XML $webPartXml -ZoneId $zoneId -ZoneIndex  $zoneIndex
}

Function RemoveWebPartFromPage($serverRelativePageUrl, $webPartTitle)
{    
    Remove-SPOWebPart -ServerRelativePageUrl $serverRelativePageUrl -Title $webPartTitle
}

Function ConnectToSharePoint($siteUrl)
{
    Write-Host "Importing O365 Commandlets..."
    Import-Module OfficeDevPnP.PowerShell.V16.Commands -WA 0

    Write-Host "Connecting to SP Site..."
    #$user = $args[3]
    #$password = ConvertTo-SecureString $args[4] -AsPlainText -Force
    #$cred = new-object -typename System.Management.Automation.PSCredential -argumentlist $user, $password
    Connect-SPOnline -url $siteUrl #-Credentials $cred
}