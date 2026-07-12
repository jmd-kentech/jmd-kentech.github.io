---
layout: page
permalink: /publications/
title: publications
nav: true
nav_order: 2
_styles: >
  .col.col-sm-2.abbr { display: none; }
  .publications ol.bibliography { padding-left: 3rem; padding-right: 0.5rem; list-style: none; }
  .publications ol.bibliography > li { position: relative; }
  .publications ol.bibliography > li::before {
    content: attr(data-num) ".";
    position: absolute;
    left: -2.8rem;
    top: 0;
    color: var(--global-text-color);
    font-weight: 600;
    min-width: 2.5rem;
    text-align: right;
  }
  .col-sm-8 { max-width: 100%; flex: 0 0 100%; }
  .periodical, .periodical a, .periodical a em, .periodical a strong { color: var(--global-theme-color) !important; }
  .periodical a { text-decoration: none; }
  .periodical a:hover { text-decoration: underline; }
  .post-header { display: none; }
  @media (max-width: 576px) {
    .publications ol.bibliography { padding-left: 2.2rem; padding-right: 0.75rem; }
    .publications ol.bibliography > li::before { left: -2rem; min-width: 1.8rem; font-size: 0.85rem; }
    .publications .title { font-size: 0.95rem; }
    .publications .author, .publications .periodical { font-size: 0.85rem; }
  }
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography %}

</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
  var lis = document.querySelectorAll('.publications ol.bibliography > li');
  var total = lis.length;
  lis.forEach(function (li, i) {
    li.dataset.num = total - i;
  });
});
</script>
