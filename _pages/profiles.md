---
layout: profiles
permalink: /members/
title: members
nav: true
nav_order: 1
_styles: >
  .post-header { display: none; }
  .post article hr { display: none; }

profiles:
  # if you want to include more than one profile, just replicate the following block
  # and create one content file for each profile inside _pages/
  - align: right
    image: youngkwangjung_profile.jpg
    image_circular: true
    content: about_einstein.md
    #image_circular: false # crops the image to make it circular
    more_info: >
      <div style="text-align: center;">
        <p>Principal Investigator</p>
        <div style="font-size: 1.4rem; display: flex; gap: 0.75rem; justify-content: center; margin-top: 0.4rem;">
          <a href="mailto:you@example.com" title="Email"><i class="fa-solid fa-envelope"></i></a>
          <a href="https://scholar.google.com/citations?user=gKwOFtUAAAAJ&hl=en" title="Google Scholar" target="_blank"><i class="ai ai-google-scholar"></i></a>
        </div>
      </div>
  - align: left
    image: prof_pic.jpg
    content: about_einstein.md
    #image_circular: false # crops the image to make it circular
    more_info: >
      <p>555 your office number</p>
      <p>123 your address street</p>
      <p>Your City, State 12345</p>
---
