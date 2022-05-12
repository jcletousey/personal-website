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

## How the internationalization is working

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

2. Create the corresponding directories in the `content` one  
```
|- content  
    |- en  
    |- fr
```

1. To generate automatic links for the page translations, add the `idI18n` _front matter_ attribute in all the related pages.

For example, in `content/en/pages/my-page.md`, add in the _front matter_:
```markdown
---
idI18n: 1
title: My page
...
---

My content
```

and in `content/fr/pages/ma-page.md`:
```markdown
---
idI18n: 1
title: Ma page
...
---

Mon contenu
```

It will use the _[Eleventy computed data](https://www.11ty.dev/docs/data-computed/)_ to populate the links in the front matter attribute `translations`. So, this variable will be available in the templates.
