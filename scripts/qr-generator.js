
// Generate a unique hash based on today's date
function getDailyCode() {
    const date = new Date().toISOString().split('T')[0]; // e.g. 2025-04-21
    const secret = "ChronoTrackSecretKey";
    return sha256(date + secret);
}

// Generate SHA-256 hash
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Render the QR code
async function renderQRCode() {
    const code = await getDailyCode();
    const canvas = document.getElementById("qr");
    new QRious({
        element: canvas,
        value: "https://efiarchean94.github.io/Chrono-Track/scan.html?code=" + code,
        size: 250
    });
}

// Load QRious script then run
(function () {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/qrious@4.0.2/dist/qrious.min.js";
    script.onload = renderQRCode;
    document.head.appendChild(script);
})();
