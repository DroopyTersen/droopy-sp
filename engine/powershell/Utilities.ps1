$path = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
Write-Host $path

Function InjectScriptToWikiPage($serverRelativePageUrl, $content, $webPartTitle, $row = 1, $column = 1)
{
    #$webPartXml = (Get-Content -Path .\ScriptWebPartTemplate.webpart -Raw)
    $path2 = $path + "\ScriptWebpartTemplate.webpart"
    Write-Host $path2
    $webPartXml = (Get-Content -Path $path2 -Raw)
    $webPartXml = $webPartXml -Replace "{{Content}}", $content
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
    Connect-SPOnline -url $siteUrl -UseWebLogin
}