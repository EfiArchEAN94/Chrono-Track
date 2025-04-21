
// QR Scanner Logic for ChronoTrack
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('attendance-form');
    const input = form.querySelector('input');
    const reader = new Html5Qrcode("reader");

    reader.start(
        { facingMode: "environment" }, // rear camera by default
        {
            fps: 10,
            qrbox: 250
        },
        (decodedText) => {
            document.getElementById('reader').style.display = 'none';
            form.style.display = 'block';
            input.focus();
        },
        (errorMessage) => {
            console.log(errorMessage);
        }
    );

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const studentId = input.value.trim();
        if (!studentId) return alert("Enter your Student ID");

        const now = new Date();
        const date = now.toLocaleDateString('en-CA');
        const time = now.toLocaleTimeString('en-GB');

        fetch("https://script.google.com/macros/s/AKfycbzWVsaOl5D-eQ7aOJH6xoKPMVIrSWtGLsxvlk7iwB1_diBgLJu153aEXxpuvg309q48LA/exec", {
            method: "POST",
            body: JSON.stringify({ studentId, date, time }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.text())
        .then(result => {
            alert("Attendance recorded");
            input.value = "";
            form.style.display = 'none';
            document.getElementById('reader').style.display = 'block';
        })
        .catch(error => {
            alert("Error recording attendance");
            console.error(error);
        });
    });
});
