(() => {
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-wa-location]");
    if (!el) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp_click",
      location: el.dataset.waLocation,
    });
  });
})();
