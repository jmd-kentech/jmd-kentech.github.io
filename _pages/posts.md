---
layout: default
permalink: /posts/
title: posts
nav: true
nav_order: 3
---

<div class="post">

  <ul class="post-list">

    {% assign postlist = site.posts | sort: 'date' | reverse %}

    {% for post in postlist %}
      <li>
        <h3>
          <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h3>
        <p>{{ post.description }}</p>
        <p class="post-meta">{{ post.date | date: '%B %d, %Y' }}</p>
      </li>
    {% endfor %}

  </ul>

</div>
