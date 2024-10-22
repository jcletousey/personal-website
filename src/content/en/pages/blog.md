---
title: Blog
layout: blog.webc
pagination:
  data: collections.posts_en
  alias: posts
  size: 5
  reverse: true
eleventyNavigation:
  key: Blog
  order: 2
permalink: "en/blog/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber }}/{% endif %}index.html"
---

This is my blog where I share my feedback, my thoughts and react to the news. All this, mainly around web development.
