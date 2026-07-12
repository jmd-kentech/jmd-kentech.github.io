---
layout: page
permalink: /members/
title: members
nav: true
nav_order: 1
_styles: >
  .post-header { display: none; }
  .member-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 1rem;
  }
  @media (max-width: 576px) {
    .member-grid { grid-template-columns: 1fr; }
  }
  .member-card {
    text-align: center;
    padding: 1.75rem 1rem;
    border-radius: 8px;
    background: var(--global-card-bg-color);
    transition: transform 0.2s, box-shadow 0.2s;
    text-decoration: none;
    display: block;
    color: var(--global-text-color);
  }
  .member-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
    text-decoration: none;
    color: var(--global-text-color);
  }
  .member-card img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 0.6rem;
  }
  .member-card .member-name {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0rem;
  }
  .member-card .member-name-sub {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0rem;
  }
  .member-card .member-role {
    font-size: 1.25rem;
    color: var(--global-text-color-light);
  }
---

<div class="member-grid">
  {% for member in site.data.members %}
  <a href="{{ member.url | relative_url }}" class="member-card">
    {% assign img_path = member.image | prepend: 'assets/img/' %}
    {% include figure.liquid path=img_path alt=member.name loading="eager" %}
    <div class="member-name">{{ member.name }}</div>
    {% if member.name_sub %}<div class="member-name-sub">{{ member.name_sub }}</div>{% endif %}
    <div class="member-role">{{ member.role }}</div>
  </a>
  {% endfor %}
</div>
