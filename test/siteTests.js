exports.run = function() {
	var siteUrl = "https://andrewpetersen.sharepoint.com";
	var absolutePath = process.cwd() + "\\index.js";
	var engine = require("../engine");
	var site = engine.site(siteUrl);
	describe("Site Commands", function() {
		context("Inject - site.inject(fileUrl, name, scope='Web', folder='Style Library/_spBrander')", function() {
			it("Should create 2 commands, upload and inject, if passed a local filesystem filepath", function() {
				site.commands.should.have.length(1);
				site.inject(absolutePath, 'test-js');
				site.commands.should.have.length(3);
			})
		})
	})
}