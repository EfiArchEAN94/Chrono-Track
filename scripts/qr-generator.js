
// Generate SHA-256 hash
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Generate a unique code based on today's date
async function getDailyQRCode() {
    const date = new Date().toISOString().split('T')[0]; // e.g., 2025-04-21
    const secret = "ChronoTrackSecretKey";
    const hash = await sha256(date + secret);
    const qrUrl = "https://efiarchean94.github.io/Chrono-Track/scan.html?code=" + hash;
    renderQRCode(qrUrl);
}

// Render the QR code using QRious
function renderQRCode(value) {
    const canvas = document.getElementById("qr");
    new QRious({
        element: canvas,
        value: value,
        size: 250
    });
}

// Load QRious then generate QR
(function () {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/qrious@4.0.2/dist/qrious.min.js";
    script.onload = getDailyQRCode;
    document.head.appendChild(script);
})();
