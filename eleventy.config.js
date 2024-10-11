import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import eleventyRssPlugin from "@11ty/eleventy-plugin-rss";
import timeToReadPlugin from "eleventy-plugin-time-to-read";
import locales from "./src/_data/locales.js";
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItContainer from "markdown-it-container";
import readFromCache from "./src/_utils/cache.js";

const WEBMENTION_CACHE_FILE = "_cache/webmentions.json";

export default async function (eleventyConfig) {
  // Plugins
  const { EleventyI18nPlugin } = await import("@11ty/eleventy");
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventyRssPlugin);
  eleventyConfig.addPlugin(timeToReadPlugin, {
    speed: "250 words a minute",
  });
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: "en",
  });

  // Assets
  eleventyConfig.addPassthroughCopy("./src/assets/js");
  eleventyConfig.addPassthroughCopy("./src/assets/css");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets/images");
  eleventyConfig.addPassthroughCopy("./src/assets/documents");
  eleventyConfig.addPassthroughCopy("./src/_redirects");
  eleventyConfig.addWatchTarget("./src/assets/sass/");

  // Markdown
  const mdRender = new markdownIt({ html: true, linkify: true })
    .use(markdownItAttrs)
    .use(markdownItContainer, "alert");
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
  eleventyConfig.addFilter("formatShortDate", function (str, locale) {
    const date = new Date(str);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Intl.DateTimeFormat(locale, options).format(date);
  });
  eleventyConfig.addFilter("formatTime", function (str, locale) {
    const date = new Date(str);
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Intl.DateTimeFormat(locale, options).format(date);
  });
  eleventyConfig.addFilter("dateToISO", function (date) {
    return new Date(date).toISOString();
  });
  eleventyConfig.addFilter("interpolate", function (str, variables) {
    const regex = /{{(.*?)}}/g;
    return str.replace(regex, (match, key) => {
      key = key.trim();
      const variable = variables[key];
      if (variable === undefined) {
        console.error(
          `The key '${key}' does not exist in your variables to interpolate !`
        );
      }
      return variable;
    });
  });
  // https://github.com/nhoizey/nicolas-hoizey.com/blob/main/src/_11ty/filters/webmention.js
  eleventyConfig.addFilter("getWebmentionsForUrl", (url) => {
    // TODO: for each URL, we loop through all webmentions, should be optimized
    if (url === undefined) {
      console.log("No URL for webmention matching");
      return [];
    }

    const cached = readFromCache(WEBMENTION_CACHE_FILE);
    return cached.webmentions.filter((entry) => {
      return new URL(entry["wm-target"]).pathname === url;
    });
  });
  eleventyConfig.addFilter("webmentionsByType", function (mentions, mentionType) {
      return mentions.filter((entry) => entry["wm-property"] === mentionType);
    }
  );
  // Get the first n elements of a collection
  eleventyConfig.addFilter('head', (array, n) => {
    if (n < 0) {
      return array.slice(n)
    }

    return array.slice(0, n)
  });

  // Shortcodes
  eleventyConfig.addShortcode("my_age", function () {
    return new Date().getFullYear() - 1982;
  });

  // Collections per locale
  for (const locale of locales) {
    eleventyConfig.addCollection(`pages_${locale}`, function (collection) {
      return collection.getFilteredByGlob([
        `./src/content/${locale}/pages/*.md`,
        `./src/content/${locale}/pages/*.njk`,
      ]);
    });

    eleventyConfig.addCollection(`posts_${locale}`, function (collection) {
      return collection.getFilteredByGlob(
        `./src/content/${locale}/blog/**/*.md`
      );
    });

    eleventyConfig.addCollection(`notes_${locale}`, function (collection) {
      return collection.getFilteredByGlob(
        `./src/content/${locale}/notes/**/*.md`
      );
    });

    eleventyConfig.addCollection(`bookmarks_${locale}`, function (collection) {
      return collection.getFilteredByGlob(
        `./src/content/${locale}/bookmarks/**/*.md`
      );
    });

    eleventyConfig.addCollection(`photos_${locale}`, function (collection) {
      return collection.getFilteredByGlob(
        `./src/content/${locale}/photos/**/*.md`
      );
    });

    eleventyConfig.addCollection(`activity_${locale}`, function (collection) {
      return collection.getFilteredByGlob([
        `./src/content/${locale}/blog/**/*.md`,
        `./src/content/${locale}/notes/**/*.md`,
        `./src/content/${locale}/bookmarks/**/*.md`,
        `./src/content/${locale}/likes/**/*.md`,
        `./src/content/${locale}/photos/**/*.md`,
      ]);
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
