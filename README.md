SPBrander
===================


This tool allows you to edit CSS and JavaScript files directly on you local PC and see them update live on your targeted SharePoint Online site.

----------


Pre-Requisites
-------------
#### <a href="https://nodejs.org/en/">Node.js</a> 
#### <a href="https://github.com/OfficeDev/PnP-PowerShell">Office PnP Powershell Commandlets</a> 

1. Install node.js by downloading the installer from the above link (go for version 5.0+).
2. Install the Office PnP Powershell Commandlets by running powershell as an Administator
	`
	Install-Module OfficeDevPnP.PowerShell.V16.Commands
	`

 **Note:** Check out the Office PnP link above for me details on the install


Install
-------------------
1. Open powershell as an Administrator and run:
`npm install -g spbrander`


Usage
-------------------
Lets say you have a `/branding` folder on your desktop with your CSS file.  
1. Run Powershell as an Administrator
2. Change directories into your branding folder ex: `>>cd c:\users\apetersen\desktop\branding`
3. Temporarily add your CSS file to the SharePoint site so you can make live edits that  anyone can see: `>>spbrander -f mystyles.css -u https://andrewpetersen.sharepoint.com`
5.  You will be prompted for your SharePoint Credentials
6. Leave the powershell process open for as long as you are editing the file.  
7. When you are done working, hit `Ctrl-C` to stop it.
8. You will be asked for credentials again so that it can remove your stylesheet from the site.
