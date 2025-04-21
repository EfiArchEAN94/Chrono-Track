
(function () {
  const formUrl = "https://forms.gle/C6sUCknhkx95wZdU7";
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/qrious@4.0.2/dist/qrious.min.js";
  script.onload = () => {
    new QRious({
      element: document.getElementById("qr"),
      value: formUrl,
      size: 250
    });
  };
  document.head.appendChild(script);
})();
