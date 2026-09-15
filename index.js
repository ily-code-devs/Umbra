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
    }
 
    html.${HTML_CLASS} {
      color: #ffffff;
    }
    html.${HTML_CLASS} body,
    html.${HTML_CLASS} p,
    html.${HTML_CLASS} span,
    html.${HTML_CLASS} div,
    html.${HTML_CLASS} li,
    html.${HTML_CLASS} td,
    html.${HTML_CLASS} th,
    html.${HTML_CLASS} label,
    html.${HTML_CLASS} h1,
    html.${HTML_CLASS} h2,
    html.${HTML_CLASS} h3,
    html.${HTML_CLASS} h4,
    html.${HTML_CLASS} h5,
    html.${HTML_CLASS} h6,
    html.${HTML_CLASS} a {
      color: #ffffff;
    }
 
    html.${HTML_CLASS} a:not([style*="color"]) {
      color: #6ea8fe;
    }
 
    html.${HTML_CLASS} input,
    html.${HTML_CLASS} textarea,
    html.${HTML_CLASS} select,
    html.${HTML_CLASS} button {
      background-color: #111111 !important;
      color: #ffffff;
      border-color: #444444 !important;
    }
 
    html.${HTML_CLASS} img,
    html.${HTML_CLASS} picture,
    html.${HTML_CLASS} video,
    html.${HTML_CLASS} canvas,
    html.${HTML_CLASS} svg,
    html.${HTML_CLASS} iframe {
      background-color: initial !important;
      filter: none !important;
      -webkit-filter: none !important;
    }
  `;
})();