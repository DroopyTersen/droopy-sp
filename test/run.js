var spbrander 		= require("../engine");
var droopyServer 	= require("droopy-server");

var siteUrl = "https://andrewpetersen.sharepoint.com";

	spbrander.site(siteUrl)
		// .remove("droopy-css")
		// .remove("droopy-js")
		.remove("debug-js")
		.remove("debug-css")
		.inject("/style library/_droopy/droopy.site.css", "droopy-css")
		.inject("/style library/_droopy/droopy.site.js", "droopy-js")
		// .inject(url + "/test/test.js", "debug-js")
		// .inject(url + "/test/test.css", "debug-css")
		.page("/SitePages/DevHome.aspx")
			.inject("/test/test.html", "test-webpart")

		.execute()
		.then(() => console.log("SUCCESS"));

