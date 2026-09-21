(function () {
    const STYLE_ID = "umbra-style";
    const HTML_CLASS = "umbra-dark-mode";
    const STORAGE_KEY = "umbraEnabled";

    const darkModeCSS = `
    html.${HTML_CLASS},
    html.${HTML_CLASS} body,
    html.${HTML_CLASS} * {
      background-color: #000000 !important;
      border-color: #333333 !important;
      color: #ffffff !important;
    }

    html.${HTML_CLASS} a {
      color: #6ea8fe !important;
    }

    html.${HTML_CLASS} input,
    html.${HTML_CLASS} textarea,
    html.${HTML_CLASS} select,
    html.${HTML_CLASS} button {
      background-color: #111111 !important;
      color: #ffffff !important;
      border-color: #444444 !important;
    }

    html.${HTML_CLASS} img,
    html.${HTML_CLASS} picture,
    html.${HTML_CLASS} video,
    html.${HTML_CLASS} canvas,
    html.${HTML_CLASS} iframe {
      background-color: initial !important;
      filter: none !important;
      -webkit-filter: none !important;
    }
  `;

    function injectStylesheet() {
        if (document.getElementById(STYLE_ID)) return;
        const styleEl = document.createElement("style");
        styleEl.id = STYLE_ID;
        styleEl.textContent = darkModeCSS;
        document.documentElement.appendChild(styleEl);
    }

    function setDarkMode(enabled) {
        injectStylesheet();
        document.documentElement.classList.toggle(HTML_CLASS, enabled);
    }

    function isDarkModeEnabled() {
        return document.documentElement.classList.contains(HTML_CLASS);
    }

    function loadSavedState() {
        chrome.storage.local.get([STORAGE_KEY], (result) => {
            const enabled = !!result[STORAGE_KEY];
            setDarkMode(enabled);
        });
    }

    function saveState(enabled) {
        chrome.storage.local.set({ [STORAGE_KEY]: enabled });
    }

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "umbra-toggle") {
            const newState = !isDarkModeEnabled();
            setDarkMode(newState);
            saveState(newState);
            sendResponse({ enabled: newState });
        } else if (message.action === "umbra-set") {
            setDarkMode(!!message.enabled);
            saveState(!!message.enabled);
            sendResponse({ enabled: !!message.enabled });
        } else if (message.action === "umbra-get-state") {
            sendResponse({ enabled: isDarkModeEnabled() });
        }
        return true;
    });

    const observer = new MutationObserver(() => {
        chrome.storage.local.get([STORAGE_KEY], (result) => {
            if (result[STORAGE_KEY] && !isDarkModeEnabled()) {
                setDarkMode(true);
            }
        });
    });

    injectStylesheet();
    loadSavedState();
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
})();