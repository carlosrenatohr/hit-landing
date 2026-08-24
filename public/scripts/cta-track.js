(() => {
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-cta]");
    if (!el) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "cta_click",
      cta_location: el.dataset.cta,
      cta_text: el.textContent.trim().substring(0, 50),
      link_url: el.href || "",
    });
  });
})();
