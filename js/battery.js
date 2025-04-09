// STEP 1a: Grab elements for displaying the battery info
const chargeStatus = document.querySelector('#charging-status');
const chargeLevel = document.querySelector('#charge-level');
const chargeMeter = document.querySelector('#charge-meter');
const batteryImage = document.querySelector('#battery-image');
const errorMessage = document.querySelector('#error-message');

// STEP 3a: Create the updateBatteryStatus() function
function updateBatteryStatus(battery) {
    console.log(battery);
    
    // STEP 3b: Update the charging status
    chargeStatus.textContent = battery.charging ? "Charging..." : "Discharging...";

    // STEP 3c: Update the charge level
    const level = Math.round(battery.level * 100);
    chargeLevel.textContent = level + "%";
    chargeMeter.value = level;

    // STEP 3d: Generate the RoboHash image URL based on the battery percentage
    const imageUrl = `https://robohash.org/${level}.png`; // Send battery level to RoboHash API
    batteryImage.src = imageUrl; // Set the image source to the generated URL
    batteryImage.alt = `RoboHash Image for ${level}% battery`; // Add alt text for image accessibility
    batteryImage.style.display = 'block'; // Display the image
}

// STEP 2a: Use the getBattery() method to retrieve battery info
function getBatteryInfo() {
  navigator.getBattery().then(battery => {
    // STEP 2b: Log battery object for debugging
    console.log(battery);

    // STEP 3d: Initial update
    updateBatteryStatus(battery);

    // STEP 4a: Update on charging status change
    battery.addEventListener("chargingchange", () => updateBatteryStatus(battery));

    // STEP 4b: Update on level change
    battery.addEventListener("levelchange", () => updateBatteryStatus(battery));
  }).catch((error) => {
    // Handle errors if the Battery API is not supported
    console.error("Battery API is not supported", error);
    errorMessage.textContent = "Battery API is not supported on your device.";
  });
}

// Event listener for the button to fetch battery info
document.querySelector('#get-battery').addEventListener('click', getBatteryInfo);
