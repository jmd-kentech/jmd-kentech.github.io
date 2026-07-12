---
layout: default
permalink: /posts/
title: posts
nav: true
nav_order: 3
pagination:
  enabled: true
  collection: posts
  permalink: /posts/page/:num/
  per_page: 10
  sort_field: date
  sort_reverse: true
  trail:
    before: 1
    after: 3
---

<div class="post">

  <ul class="post-list">

    {% if page.pagination.enabled %}
      {% assign postlist = paginator.posts %}
    {% else %}
      {% assign postlist = site.posts %}
    {% endif %}

    {% for post in postlist %}
      {% assign year = post.date | date: "%Y" %}

      <li>
        <h3>
          <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h3>
        <p>{{ post.description }}</p>
        <p class="post-meta">{{ post.date | date: '%B %d, %Y' }}</p>
      </li>

    {% endfor %}

  </ul>

  {% if page.pagination.enabled %}
    {% include pagination.liquid %}
  {% endif %}

</div>
