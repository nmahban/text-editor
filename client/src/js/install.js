const butInstall = document.getElementById("buttonInstall");

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();

  deferredPrompt = event;

  butInstall.classList.toggle("hidden", false);
});

butInstall.addEventListener("click", async () => {
  butInstall.classList.toggle("hidden", true);

  if (deferredPrompt) {
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    deferredPrompt = null;
  }
});

window.addEventListener("appinstalled", (event) => {
  console.log("PWA installed");
});
