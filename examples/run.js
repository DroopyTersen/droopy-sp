var spbrander 		= require("../engine");
var droopyServer 	= require("droopy-server");

var siteUrl = "https://andrewpetersen.sharepoint.com";

	spbrander.site(siteUrl)
		// .remove("droopy-css")
		// .remove("droopy-js")
		// .inject(url + "/test/test.js", "debug-js")
		// .inject(url + "/test/test.css", "debug-css")
		.upload("/test/test2.html", "Style Library/_spbrander")
		.upload("/test/test.css", "Style Library/_spbrander")
		.inject("/style library/_droopy/droopy.site.css", "droopy-css")
		.inject("/style library/_droopy/droopy.site.js", "droopy-js")
		.inject("/style library/_spbrander/test.css", "debug-css")

		.page("/SitePages/DevHome.aspx")
			.inject(siteUrl + "/Style Library/_spbrander/test2.html", "test2-webpart")
			.inject("/test/test.html", "test-webpart")

		.execute()
		.then(() => console.log("SUCCESS"));


var debug = function() {
	// Start a local file server and expose it to the internet
	droopyServer.start().then(ngrokUrl => {
		// Use spbrander to inject file urls that are prefixed with your file server host
		spbrander.site(siteUrl)
			.inject(ngrokUrl + "/dist/droopy.site.js", "droopy-js")
			.inject(ngrokUrl + "/dist/droopy.site.css", "droopy-css")
			.page("/SitePages/DevHome.aspx")
				.inject(ngrokUrl + "/src/scripts/components/birthdays/birthdays.html", "birthdays-webpart")
				.inject(ngrokUrl + "/src/scripts/components/anniversaries/anniversaries.html", "anniversaries-webpart")
			.execute()
	})
}

var debugCleanup = function() {
	spbrander.site(siteUrl)
		.remove("droopy-js")
		.remove("droopy-css")
		.page("/SitePages/DevHome.aspx")
			.remove("birthdays-webpart")
			.remove("anniversaries-webpart")
		.execute();
}