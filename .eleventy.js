const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const locales = require("./src/_data/locales")();
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addPassthroughCopy("./src/assets/css");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addWatchTarget("./src/assets/sass/");

  // Filters
  const mdRender = new markdownIt();
  eleventyConfig.addFilter("renderMarkdown", function (rawString) {
    return mdRender.render(rawString);
  });

  // Collections
  for (const locale of locales) {
    eleventyConfig.addCollection(`pages_${locale}`, function (collection) {
      return collection.getFilteredByGlob(`./src/content/${locale}/pages/*.md`);
    });

    eleventyConfig.addCollection(`posts_${locale}`, function (collection) {
      return collection.getFilteredByGlob(`./src/content/${locale}/blog/*.md`);
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
