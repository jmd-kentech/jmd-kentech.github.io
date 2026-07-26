(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    return;
  }

  var COLORS = ["#f94144", "#f3722c", "#f9c74f", "#90be6d", "#43aa8b", "#577590", "#ff6392"];
  var PARTICLES_PER_BURST = 14;
  var DURATION_MS = 700;
  var SAME_TAB_DELAY_MS = 140;
  var NEW_TAB_DELAY_MS = 700;

  document.addEventListener("click", function (event) {
    burst(event.clientX, event.clientY);

    // A same-page click's burst is visible on its own, but a link click
    // navigates away (or, for target="_blank", steals focus to a new tab)
    // almost immediately and would cut the animation off before it's ever
    // seen. Hold same-origin link clicks just long enough for the burst to
    // register, then continue on to wherever the link was headed.
    var link = event.target.closest && event.target.closest("a[href]");
    if (link && !event.defaultPrevented && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && link.origin === location.origin) {
      event.preventDefault();
      var href = link.href;
      var opensNewTab = link.target === "_blank";
      setTimeout(
        function () {
          if (opensNewTab) {
            window.open(href, "_blank", "noopener,noreferrer");
          } else {
            window.location.href = href;
          }
        },
        opensNewTab ? NEW_TAB_DELAY_MS : SAME_TAB_DELAY_MS
      );
    }
  });

  function burst(x, y) {
    for (var i = 0; i < PARTICLES_PER_BURST; i++) {
      spawnParticle(x, y);
    }
  }

  function spawnParticle(x, y) {
    var angle = Math.random() * Math.PI * 2;
    var distance = 40 + Math.random() * 60;
    var dx = Math.cos(angle) * distance;
    var dy = Math.sin(angle) * distance;
    var size = 4 + Math.random() * 4;
    var color = COLORS[Math.floor(Math.random() * COLORS.length)];

    var particle = document.createElement("span");
    particle.style.cssText = [
      "position:fixed",
      "left:" + x + "px",
      "top:" + y + "px",
      "width:" + size + "px",
      "height:" + size + "px",
      "background:" + color,
      "border-radius:" + (Math.random() < 0.5 ? "50%" : "2px"),
      "pointer-events:none",
      "z-index:9999",
      "will-change:transform,opacity",
    ].join(";");

    document.body.appendChild(particle);

    var animation = particle.animate(
      [
        { transform: "translate(-50%, -50%) translate(0, 0) rotate(0deg)", opacity: 1 },
        {
          transform: "translate(-50%, -50%) translate(" + dx + "px, " + dy + "px) rotate(" + Math.random() * 360 + "deg)",
          opacity: 0,
        },
      ],
      {
        duration: DURATION_MS + Math.random() * 200,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      }
    );

    animation.onfinish = function () {
      particle.remove();
    };
  }
})();
