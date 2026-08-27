(() => {
  var thresholds = [25, 50, 75, 90];
  var fired = {};

  function check() {
    var scrollHeight = document.documentElement.scrollHeight;
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var clientHeight = document.documentElement.clientHeight;
    var pct = Math.round(((scrollTop + clientHeight) / scrollHeight) * 100);

    for (var i = 0; i < thresholds.length; i++) {
      var t = thresholds[i];
      if (pct >= t && !fired[t]) {
        fired[t] = true;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "scroll_depth",
          scroll_percent: t,
        });
      }
    }
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        check();
        ticking = false;
      });
      ticking = true;
    }
  });
})();
