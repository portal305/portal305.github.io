var body = document.body;
var icon = document.getElementById("theme-icon");

function toggle() {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    setCookie("darkMode", "1", 365);
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    setCookie("darkMode", "0", 365);
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}

window.onload = function () {
  var darkMode = getCookie("darkMode");
  var body = document.body;
  if (darkMode === "1") {
    body.classList.add("dark-mode");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");    
  } else if (darkMode === "0") {
    body.classList.remove("dark-mode");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
};

function share() {
  new Notify({
    status: "success",
    title: "Link copied",
    text: "",
    effect: "fade",
    speed: 300,
    customClass: "",
    customIcon: "",
    showIcon: true,
    showCloseButton: true,
    autoclose: true,
    autotimeout: 3000,
    notificationsGap: null,
    notificationsPadding: null,
    type: "filled",
    position: "center top",
    customWrapper: "",
  });

  navigator.clipboard.writeText(
    "https://portal305.github.io/"
  );
}
