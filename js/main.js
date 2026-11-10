(() => {
  const grid = document.getElementById("project-grid");
  const filters = document.getElementById("filters");
  const dialog = document.getElementById("lightbox");
  const lightboxContent = document.getElementById("lightbox-content");

  const safe = (value) => String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[ch]));

  function render(filter = "all") {
    const projects = (window.MAD_PROJECTS || []).filter(p => filter === "all" || p.category === filter);
    grid.innerHTML = projects.map(p => `
      <article class="project-card">
        <div class="project-visual" role="button" tabindex="0"
          data-media="${safe(p.media || p.thumbnail)}" data-title="${safe(p.title)}" aria-label="Open ${safe(p.title)}">
          <div class="visual-placeholder">${safe(p.number)}<span>.</span></div>
          <img src="${safe(p.thumbnail)}" alt="${safe(p.title)}" loading="lazy"
            onerror="this.style.display='none'">
          <div class="project-overlay">
            <div class="project-top"><span class="project-number">MAD VISUALS / ${safe(p.number)}</span><span class="project-open">↗</span></div>
            <div class="project-bottom"><div><div class="project-type">${safe(p.label)}</div><h3>${safe(p.title)}</h3></div><span class="project-play">${p.media ? "▶" : "↗"}</span></div>
          </div>
        </div>
      </article>`).join("");
    grid.querySelectorAll(".project-visual").forEach(card => {
      card.addEventListener("click", () => openProject(card.dataset.media, card.dataset.title));
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openProject(card.dataset.media, card.dataset.title); }
      });
    });
  }

  function openProject(media, title) {
    lightboxContent.innerHTML = "";
    if (media) {
      const isVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(media);
      if (isVideo) {
        const video = document.createElement("video");
        video.src = media; video.controls = true; video.autoplay = true; video.playsInline = true;
        lightboxContent.appendChild(video);
      } else if (/youtube\.com|youtu\.be|vimeo\.com/i.test(media)) {
        const frame = document.createElement("iframe");
        frame.src = media; frame.title = title; frame.allow = "autoplay; fullscreen; picture-in-picture";
        frame.allowFullscreen = true; lightboxContent.appendChild(frame);
      } else {
        const img = document.createElement("img"); img.src = media; img.alt = title; lightboxContent.appendChild(img);
      }
    } else {
      lightboxContent.innerHTML = `<p class="empty-preview">${safe(title)} — add a video path in js/projects.js to enable playback.</p>`;
    }
    dialog.showModal();
  }

  filters.addEventListener("click", e => {
    const button = e.target.closest("[data-filter]");
    if (!button) return;
    filters.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === button));
    render(button.dataset.filter);
  });
  dialog.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => {
    const video = lightboxContent.querySelector("video");
    if (video) video.pause();
    lightboxContent.innerHTML = "";
  });

  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuButton.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "×" : "☰";
  });
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  }));

  document.getElementById("year").textContent = new Date().getFullYear();
  render();
})();
