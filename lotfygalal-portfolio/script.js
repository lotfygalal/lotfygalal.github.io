document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome Lotfy! 👋 Portfolio loaded successfully ✅");

  // ========== Scroll Reveal ==========
  const sections = document.querySelectorAll("section");
  const options = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  sections.forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
  });

  // ========== Scroll to Top Button ==========
  const scrollBtn = document.createElement("button");
  scrollBtn.textContent = "⬆";
  scrollBtn.className = "scroll-to-top";
  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
  });

  // ========== Smooth Scroll for Nav Links ==========
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ========== Cursor Follow Circle ==========
  const cursor = document.createElement("div");
  cursor.className = "cursor-circle";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
});
