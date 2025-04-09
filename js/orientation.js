/* Variables
-------------------------------------------------- */
// Alpha (rotation)
const alphaSlider = document.querySelector('#alpha input[type="range"]');
const alphaValue = document.querySelector('#alpha output');

// Beta (tilt forward/backward)
const betaSlider = document.querySelector('#beta input[type="range"]');
const betaValue = document.querySelector('#beta output');

// Gamma (tilt left/right)
const gammaSlider = document.querySelector('#gamma input[type="range"]');
const gammaValue = document.querySelector('#gamma output');

// Status message
const statusMsg = document.querySelector('#status');

/* Functions
-------------------------------------------------- */
// Show error if orientation is not supported
function error() {
    statusMsg.textContent = "Device Orientation Event is not supported by your browser!";
}

/* Script Logic
-------------------------------------------------- */
if (!window.DeviceOrientationEvent) {
    // Not supported
    error();
} else {
    // Supported – listen for orientation changes
    window.addEventListener("deviceorientation", function (event) {
        console.log(event);

        // Alpha
        const alpha = Math.round(event.alpha);
        alphaSlider.value = alpha;
        alphaValue.textContent = `${alpha}°`;

        // Beta
        const beta = Math.round(event.beta);
        betaSlider.value = beta;
        betaValue.textContent = `${beta}°`;

        // Gamma
        const gamma = Math.round(event.gamma);
        gammaSlider.value = gamma;
        gammaValue.textContent = `${gamma}°`;
    });
}

/* Learn more at https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent */
