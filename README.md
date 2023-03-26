# My personal website

## Requirements

- [NodeJs](https://nodejs.org/)
- NPM (included with NodeJs)

## Getting started

- Clone this repository `git clone https://github.com/jcletousey/personal-website`
- _cd_ into the project directory and run `npm install`
- Once all the dependencies are installed run `npm start`
- Open your browser at http://localhost:8080

## Features

- Blog
- Internationalization

## How to configure the internationalization

The internationalization is used to provide links to users in order for them to switch to another supported language.

This featuref is provided by the [Eleventy i18n plugin](https://www.11ty.dev/docs/plugins/i18n/).

If you want to use it as is, you have to localize your data. It means that you have to write and organize your content accordingly to the languages you want to provide.

What you have to do is to apply the following instructions:

1. The default language is English but you can change it in the `.eleventy.js` file at the root of the project.

```javascript
module.exports = function (eleventyConfig) {
  // Plugins
  ...
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: "en",
  });
```

1. Declare your locales in `data/site.json`

```json
{
  ...,
  "locales": {
    "en": "English",
    "fr": "Français"
  }
}
```

1. Create the corresponding directories in the `content` directory. For example, with an english and a french locales:

```text
|- src
   |- content
      |- en
         |- blog
         |- pages
      |- fr
         |- blog
         |- pages
      |- ...
```

1. Then, you have to create files with the same name across the locales folders to get automatic links for the translations.

For example:

```text
|- src
   |- content
      |- en
         |- blog
            |- my-first-post.md
            |- my-second-post.md
            |- my-third-post.md # This won't have translation
         |- pages
            |- my-page.md
      |- fr
         |- blog
            |- my-first-post.md
            |- my-second-post.md
            |- mon-article.md # This won't have translation
         |- pages
            |- my-page.md
      |- ...
```
