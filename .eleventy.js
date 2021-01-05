const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addWatchTarget("./src/sass/");

  // Collections
  eleventyConfig.addCollection("all_fr", function (collection) {
    return collection.getFilteredByGlob("./src/fr/pages/*.md");
  });

  eleventyConfig.addCollection("all_en", function (collection) {
    return collection.getFilteredByGlob("./src/en/pages/*.md");
  });

  // Filters
  const mdRender = new markdownIt();
  eleventyConfig.addFilter("renderMarkdown", function (rawString) {
    return mdRender.render(rawString);
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};