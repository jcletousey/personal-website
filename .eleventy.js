const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const locales = require("./src/_data/locales")();

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Assets management
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets/css");
  eleventyConfig.addWatchTarget("./src/assets/sass/");
  eleventyConfig.addPassthroughCopy("./src/assets/images");

  // Collections
  eleventyConfig.addCollection("all_fr", function (collection) {
    return collection.getFilteredByGlob("./src/fr/pages/*.md");
  });

  eleventyConfig.addCollection("all_en", function (collection) {
    return collection.getFilteredByGlob("./src/en/pages/*.md");
  for (const locale of locales) {
    eleventyConfig.addCollection("all_" + locale, function (collection) {
      return collection.getFilteredByGlob("./src/" + locale + "/pages/*.md");
  });
  }

  // Filters
  const mdRender = new markdownIt();
  eleventyConfig.addFilter("renderMarkdown", function (rawString) {
    return mdRender.render(rawString);
  });

  return {
    dir: {
      layouts: "_includes/layouts",
      input: "src",
      output: "dist",
    },
  };
};