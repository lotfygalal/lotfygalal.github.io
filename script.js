// Scroll to Top Button
const scrollBtn = document.getElementById("scrollTopBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }

  // Fade-in animation on scroll
  const faders = document.querySelectorAll('.fade-in');
  faders.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('visible');
    }
  });
};

// Click to scroll to top
scrollBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
