var engine = require("../engine");
var siteUrl = "https://andrewpetersen.sharepoint.com/spscript";

engine.page(siteUrl, "/SitePages/Tests.aspx")
        .debug("./test/test.html", "tests");