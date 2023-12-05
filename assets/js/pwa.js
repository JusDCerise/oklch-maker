async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.register("/sw.js");

    let subscription = await registration.pushManager.getSubscription();

    if (subscription) return;

    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: "BLNGZnTUAdCaIWHr2RWX4C5fOUKnSc-WIdyalpWk7cRGheM4yiNGFN_UI_PQghwdAAn0GTBwuHHsrKh4T-dXERk",
    });
  }
}
registerServiceWorker();

let installPrompt;
const pwaInstallButton = document.getElementById("pwaInstall");
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  pwaInstallButton.removeAttribute("hidden");
  //   console.log("ca marche");
});

pwaInstallButton.addEventListener("click", async () => {
  if (!installPrompt) return;

  const result = await installPrompt.prompt();
  console.log("Install prompt result", result);
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      console.log("Notifications granted");
    } else {
      console.log("Notifications refusées");
    }
  });

  installPrompt = null;
  pwaInstallButton.setAttribute("hidden", "");
});
