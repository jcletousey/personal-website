const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const eleventyRssPlugin = require("@11ty/eleventy-plugin-rss");
const locales = require("./src/_data/locales")();
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventyRssPlugin);

  // Assets
  eleventyConfig.addPassthroughCopy("./src/assets/css");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets/images");
  eleventyConfig.addPassthroughCopy("./src/assets/documents");
  eleventyConfig.addPassthroughCopy("./src/_redirects");
  eleventyConfig.addWatchTarget("./src/assets/sass/");

  // Markdown
  const mdRender = new markdownIt({ html: true })
    .use(markdownItAttrs)
    .use(require("markdown-it-container"), "alert");
  eleventyConfig.setLibrary("md", mdRender);

  // Filters
  eleventyConfig.addFilter("renderMarkdown", function (rawString) {
    return mdRender.render(rawString);
  });
  eleventyConfig.addFilter("formatDate", function (str, locale) {
    const date = new Date(str);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat(locale, options).format(date);
  });

  // Collections
  for (const locale of locales) {
    eleventyConfig.addCollection(`pages_${locale}`, function (collection) {
      return collection.getFilteredByGlob(`./src/content/${locale}/pages/*.md`);
    });

    eleventyConfig.addCollection(`posts_${locale}`, function (collection) {
      return collection.getFilteredByGlob(`./src/content/${locale}/blog/*.md`);
    });

    eleventyConfig.addCollection(`all_${locale}`, function (collection) {
      return collection.getFilteredByGlob(`./src/content/${locale}/**/*.md`);
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
