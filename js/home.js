const items = document.querySelectorAll(".hud li");

items.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.3}s`;
});

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
