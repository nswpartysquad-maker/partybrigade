async function loadComponent(id, file) {
  try {
    const res = await fetch(file, { cache: "force-cache" });

    if (!res.ok) {
      throw new Error(`Failed to load ${file}`);
    }

    const html = await res.text();
    const el = document.getElementById(id);

    if (!el) return;

    el.innerHTML = html;

    // ✅ Execute scripts inside loaded HTML (IMPORTANT)
    el.querySelectorAll("script").forEach(oldScript => {
      const newScript = document.createElement("script");

      [...oldScript.attributes].forEach(attr =>
        newScript.setAttribute(attr.name, attr.value)
      );

      newScript.textContent = oldScript.textContent;
      oldScript.replaceWith(newScript);
    });

  } catch (err) {
    console.error("Component load error:", err);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    loadComponent("header", "/partials/header.html"),
    loadComponent("footer", "/partials/footer.html")
  ]);

  // ✅ Optional: add loaded class for animations
  document.body.classList.add("components-loaded");
});
