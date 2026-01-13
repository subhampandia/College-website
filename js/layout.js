document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();
  loadFooter();
});

function loadNavbar() {
  fetch("/college_website/partials/navbar.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("navbar").innerHTML = html;

      // INIT NAVBAR FEATURES (AFTER HTML EXISTS)
      initNavbarScroll();
      initSearchToggle();
    })
    .catch(err => console.error("Navbar load error:", err));
}

function loadFooter() {
  fetch("/college_website/partials/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer").innerHTML = html;
    })
    .catch(err => console.error("Footer load error:", err));
}

/* ================= NAVBAR SCROLL ================= */
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}

/* ================= SEARCH TOGGLE ================= */
function initSearchToggle() {
  const searchToggle = document.getElementById("searchToggle");
  const searchBox = document.getElementById("searchBox");
  const searchInput = document.querySelector(".search-input");

  if (!searchToggle || !searchBox || !searchInput) {
    console.warn("Search elements not found");
    return;
  }

  searchToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    searchBox.classList.toggle("active");
    if (searchBox.classList.contains("active")) {
      searchInput.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (!searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
      searchBox.classList.remove("active");
    }
  });
}
