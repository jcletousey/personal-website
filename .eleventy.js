const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addWatchTarget("./src/sass/");

  // Collections
  eleventyConfig.addCollection("pages_fr", function (collection) {
    return collection.getFilteredByGlob("./src/fr/pages/*.md");
  });

  eleventyConfig.addCollection("pages_en", function (collection) {
    return collection.getFilteredByGlob("./src/en/pages/*.md");
  });

  return {
    dir: {
      layouts: "_includes/layouts",
      input: "src",
      output: "dist",
    },
  };
};