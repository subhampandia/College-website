document.addEventListener("DOMContentLoaded", () => {
  loadPartial("navbar", "navbar.html");
  loadPartial("footer", "footer.html");
  initMarquee();
   initBackToTopHome();
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

      // Go to home page WITHOUT keeping old scroll
      if (!window.location.pathname.endsWith("index.html")) {
        window.location.replace(base + "index.html#" + section);
      } else {
        // Already on index page → scroll to top
        const target = document.getElementById(section);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
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
/* ================= BACK TO TOP (HOME ONLY) ================= */
function initBackToTopHome() {
  // Run ONLY on index.html or root
  const isHome =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("/college_website/");

  if (!isHome) return;

  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "flex" : "none";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
