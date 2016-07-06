exports.run = function() {
	var helpers = require("../engine/helpers");
	describe("HELPERS", function() {
		var siteUrl = "https://andrewpetersen.sharepoint.com";
		context("Get File Url - .getFilePath(filepath, siteUrl)", function() {
			it("Should handle full web urls - starts with 'http'", function() {
				var fileUrl = `${siteUrl}/Style Library/_droopy/test.js`;
				var result = helpers.getFilePath(fileUrl, siteUrl);
				result.should.equal(fileUrl);
			});
			it("Should handle absolute file system paths - starts with 'c:\\'", function() {
				var fileUrl = "C:\\gitwip\\temp\\test.js";
				var result = helpers.getFilePath(fileUrl, siteUrl);
				result.should.equal(fileUrl);
			})
			it("Should handle file system relative paths - starts with './'", function() {
				var fileUrl = "./examples/run.js";
				var result = helpers.getFilePath(fileUrl, siteUrl);
				var expected = process.cwd() + "\\examples\\run.js";
				result.should.equal(expected);
			});
			it("Should handle site relative urls - without a leading slash", function() {
				// Test without leading slash
				var fileUrl = "Style Library/test.js";
				var result = helpers.getFilePath(fileUrl, siteUrl);
				var expected = `${siteUrl}/${fileUrl}`;
				result.should.equal(expected);
			})

			it("Should handle site relative urls - WITH a leading slash", function() {
				// Test without leading slash
				var fileUrl = "/Style Library/test.js";
				var result = helpers.getFilePath(fileUrl, siteUrl);
				var expected = `${siteUrl}${fileUrl}`;
				result.should.equal(expected);

			})
		})
	});

}