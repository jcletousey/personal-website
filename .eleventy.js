const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const locales = require("./src/_data/locales")();

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(rssPlugin);

  // Assets management
  eleventyConfig.addWatchTarget("./src/assets/sass/");
  eleventyConfig.addPassthroughCopy("./src/assets/css");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets/images");
  eleventyConfig.addPassthroughCopy("./src/_redirects");

  // Collections
  for (const locale of locales) {
    eleventyConfig.addCollection("all_" + locale, function (collection) {
      return collection.getFilteredByGlob("./src/" + locale + "/pages/*.md");
    });

    eleventyConfig.addCollection("posts_" + locale, function (collection) {
      return collection.getFilteredByGlob("./src/" + locale + "/blog/*.md");
    });
  }

  // Filters
  const mdRender = new markdownIt();
  eleventyConfig.addFilter("renderMarkdown", function (rawString) {
    if (rawString !== undefined) {
      return mdRender.render(rawString);
    }
  });

  eleventyConfig.addFilter("localizedDate", function (date, locale) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(locale, options);
  });

  return {
    dir: {
      layouts: "_includes/layouts",
      input: "src",
      output: "dist",
    },
  };
};