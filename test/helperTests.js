exports.run = function() {
	var helpers = require("../engine/helpers");
	describe("HELPERS", function() {
		var siteUrl = "https://andrewpetersen.sharepoint.com";
		context("Get File Path - .getFilePath(filepath, siteUrl)", function() {
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

		context("Filepath to Url - .getFileUrl(filepath, siteUrl, folder", function() {
			var filepath = "C:\\gitwip\\temp\\test.js";
			var folder = "Style Library/_spbrander";
			it("Should craft a url like '<siteUr>/<folder>/<filename>'", function() {
				var result = helpers.getFileUrl(filepath, siteUrl, folder);
				var expected = `${siteUrl}/${folder}/test.js`
				result.should.equal(expected);
			})
		})

		context("Is Url - .isUrl(fileUrl)", function(){
			it("Should return true for valid url that starts with http", function() {
				var filepath = `${siteUrl}/Style Library/test.js`;
				var result = helpers.isUrl(filepath);
				result.should.equal(true);
			});

			it ("Should return false for an absolute local file system path", function() {
				var filepath = "C:\\gitwip\\temp\\test.js";
				var result = helpers.isUrl(filepath);
				result.should.equal(false);
			});

			it("Should return false for a ./ prefixed local file system path", function() {
				var filepath = "./examples/run.js";
				var result = helpers.isUrl(filepath);
				result.should.equal(false);
			});
		})
	});

}