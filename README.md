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

I implemented a function to generate links to translations directly from a page. See the following `3.`.

If you want to use it as is, you have to localize your data. It means that you have to write and organize your content accordingly to the languages you want to provide.

What you have to do is to apply the following instructions:

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

2. Create the corresponding directories in the `content` directory. For example, with an english and a french locales:  

```
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

3. To generate automatic links for the page translations, add the `idI18n` _front matter_ attribute in all the translation pages. It could be an `integer` or a `string`.

For example, in `content/en/pages/my-page.md`, add in the _front matter_:

```markdown
---
idI18n: 1
title: My page
...
---

My content
```

and in the french translation page `content/fr/pages/ma-page.md`, declare the same `idI18n`:

```markdown
---
idI18n: 1
title: Ma page
...
---

Mon contenu
``` 

It will use the _[Eleventy computed data](https://www.11ty.dev/docs/data-computed/)_ to populate the links in the front matter attribute `translations` at build time. In result, the variable `translations`, which is an array of links, indexed by the locale, will be available in the templates.

Here, I used a page as an example but you could do the same with post items.

> **NOTE:**
> For each new page and its translation pages, you have to use a new unique `idI18n`