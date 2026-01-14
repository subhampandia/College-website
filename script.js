document.addEventListener("DOMContentLoaded", () => {
  loadPartial("navbar", "navbar.html");
  loadPartial("footer", "footer.html");
  initMarquee();
});

/* ================= BASE PATH (SAFE & SIMPLE) ================= */
function getBasePath() {
  const path = window.location.pathname;

  // if page is inside a subfolder (academics, admission, etc.)
  if (
    path.includes("/academics/") ||
    path.includes("/admission/") ||
    path.includes("/facilities/")
  ) {
    return "../";
  }

  // home page (/college_website/index.html)
  return "";
}

/* ================= PARTIAL LOADER ================= */
function loadPartial(targetId, file) {
  const base = getBasePath();

  fetch(base + "partials/" + file)
    .then(res => {
      if (!res.ok) throw new Error("Failed to load " + file);
      return res.text();
    })
    .then(html => {
      const target = document.getElementById(targetId);
      if (!target) return;

      target.innerHTML = html;

      // home-section links after navbar loads
      if (targetId === "navbar") {
        initHomeLinks();
      }
    })
    .catch(err => console.error(err.message));
}

/* ================= HOME SECTION LINKS ================= */
function initHomeLinks() {
  document.querySelectorAll("[data-home]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const section = link.getAttribute("data-home");
      const base = getBasePath();

      window.location.href = base + "index.html#" + section;
    });
  });
}

/* ================= MARQUEE ================= */
function initMarquee() {
  document.querySelectorAll(".marquee").forEach(marquee => {
    const list = marquee.querySelector(".marquee-list");
    if (!list) return;

    const clone = list.cloneNode(true);
    marquee.appendChild(clone);

    let position = 0;
    const height = list.offsetHeight;
    const speed = 0.5;
    let paused = false;

    clone.style.top = height + "px";

    function animate() {
      if (!paused) {
        position -= speed;

        if (Math.abs(position) >= height) {
          position = 0;
        }

        list.style.transform = `translateY(${position}px)`;
        clone.style.transform = `translateY(${position}px)`;
      }

      requestAnimationFrame(animate);
    }

    marquee.addEventListener("mouseenter", () => paused = true);
    marquee.addEventListener("mouseleave", () => paused = false);

    animate();
  });
}
