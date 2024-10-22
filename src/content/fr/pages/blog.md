---
title: Blog
layout: blog.webc
pagination:
  data: collections.posts_fr
  alias: posts
  size: 5
  reverse: true
eleventyNavigation:
  key: Blog
  order: 2
permalink: "fr/blog/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber }}/{% endif %}index.html"
---

Ceci est mon blog où je partage mes retours d'expérience, mes pensées et où je réagis aux actualités. Tout ceci, principalement autour du développement _web_.
