#!/usr/bin/env bash
set -euo pipefail

tmp_dir="$(mktemp -d)"
tmp_override="${tmp_dir}/comments-test-override.yml"
tmp_site="${tmp_dir}/site"
giscus_fixture="_posts/2022-12-10-giscus-comments.md"
disqus_fixture="_posts/2015-10-20-disqus-comments.md"

cleanup() {
  rm -f "${giscus_fixture}" "${disqus_fixture}"
  rm -rf "${tmp_dir}"
}
trap cleanup EXIT

# Fixture posts are written directly into _posts/ (not just the temp build
# dir) because Jekyll always reads its collections from the site source;
# they're removed again in cleanup() regardless of pass/fail.
cat >"${giscus_fixture}" <<'POST'
---
layout: post
title: a post with giscus comments
date: 2022-12-10 11:59:00-0400
description: an example of a blog post with giscus comments
tags: comments
categories: sample-posts external-services
giscus_comments: true
related_posts: false
---

This post shows how to add GISCUS comments.
POST

cat >"${disqus_fixture}" <<'POST'
---
layout: post
title: a post with disqus comments
date: 2015-10-20 11:59:00-0400
description: an example of a blog post with disqus comments
tags: comments
categories: sample-posts external-services
disqus_comments: true
related_posts: false
---

This post shows how to add DISQUS comments.
POST

cat >"${tmp_override}" <<'YAML'
disqus_shortname: al-folio-integration-test
giscus:
  repo: alshedivat/al-folio
  repo_id: R_kgDOExample
  category: Comments
  category_id: DIC_kwDOExample
YAML

bundle exec jekyll build --config "_config.yml,${tmp_override}" -d "${tmp_site}" >/dev/null

# Path prefix follows this site's `permalink: /posts/:year/:title/` in
# _config.yml, not upstream al-folio's default `/blog/...`.
giscus_page="${tmp_site}/posts/2022/giscus-comments/index.html"
disqus_page="${tmp_site}/posts/2015/disqus-comments/index.html"

grep -q 'https://giscus.app/client.js' "${giscus_page}"
if grep -q 'giscus comments misconfigured' "${giscus_page}"; then
  echo "unexpected giscus misconfiguration warning in ${giscus_page}" >&2
  exit 1
fi

grep -q 'id="disqus_thread"' "${disqus_page}"
grep -q '.disqus.com/embed.js' "${disqus_page}"

echo "comments integration checks passed"
