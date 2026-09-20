const lightBtn = document.querySelector('[data-mode="light"]');
const darkBtn = document.querySelector('[data-mode="dark"]');
const sunIcon = document.querySelector(".icon-sun");
const moonIcon = document.querySelector(".icon-moon");

moonIcon.style.display = "none";

lightBtn.addEventListener("click", function () {
    setMode("light");
});

darkBtn.addEventListener("click", function () {
    setMode("dark");
});

function setMode(mode) {
    if (mode === "light") {
        lightBtn.classList.add("is-active");
        darkBtn.classList.remove("is-active");
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
    } else {
        lightBtn.classList.remove("is-active");
        darkBtn.classList.add("is-active");
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
    }

    document.documentElement.setAttribute("data-theme", mode);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "umbra-set",
            enabled: mode === "dark",
        });
    });
}
