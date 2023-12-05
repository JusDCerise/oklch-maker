document.addEventListener("DOMContentLoaded", () => {
  const pwaInstallButton = document.getElementById("pwaInstall");
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY >= pwaInstallButton.offsetTop + 100) {
      pwaInstallButton.classList.add("scroll");
    } else {
      pwaInstallButton.classList.remove("scroll");
    }
  });
});
