const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const locales = require("./src/_data/locales")();

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addWatchTarget("./src/sass/");

  // Collections
  for (const locale of locales) {
    eleventyConfig.addCollection(`pages_${locale}`, function (collection) {
      return collection.getFilteredByGlob(`./src/${locale}/pages/*.md`);
    });
  }

  return {
    dir: {
      layouts: "_includes/layouts",
      input: "src",
      output: "dist",
    },
  };
};