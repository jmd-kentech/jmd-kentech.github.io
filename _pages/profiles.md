---
layout: page
permalink: /members/
title: members
nav: true
nav_order: 1
---

<div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
  {% for member in site.data.members %}
  <a href="{{ member.url | relative_url }}" class="no-underline">
    <div class="card hoverable flex flex-col items-center text-center p-4 h-full">
      <img src="{{ member.image | prepend: '/assets/img/' | relative_url }}"
           class="rounded-full mb-3"
           style="width: 110px; height: 110px; object-fit: cover;"
           alt="{{ member.name }}">
      <p class="font-semibold mb-1" style="font-size: 0.9rem;">{{ member.name }}</p>
      <p class="text-muted" style="font-size: 0.78rem;">{{ member.role }}</p>
    </div>
  </a>
  {% endfor %}
</div>
