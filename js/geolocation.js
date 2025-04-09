/* Variables
-------------------------------------------------- */
// STEP 1a: Grab the <dd> elements for displaying the latitude and longitude using IDs
const latitudeElement = document.querySelector('#latitude');
const longitudeElement = document.querySelector('#longitude');

// STEP 1b: Grab the <p> element for outputting geolocation status messages
const statusMsg = document.querySelector('#status');

// STEP 1c: Grab the <a> element to use as a link to OpenStreetMap if the geolocation was successful
const mapLink = document.querySelector('#mapLink');

/* Functions
-------------------------------------------------- */
// STEP 2: Success callback function
function success(position) {
    console.log(position);

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // STEP 3: Display coordinates
    latitudeElement.textContent = `${lat}°`;
    longitudeElement.textContent = `${lon}°`;

    // STEP 4: Create OpenStreetMap link
    const url = `https://www.openstreetmap.org/#map=13/${lat}/${lon}`;
    mapLink.href = url;
    mapLink.target = "_blank";
    mapLink.textContent = "Open on Maps";
    mapLink.style.display = 'inline'; // Make sure the link is visible

    // STEP 5: Update status message
    statusMsg.textContent = "Location found!";
}

// STEP 6: Error callback function
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    statusMsg.textContent = "Sorry! Unable to find your location.";
}

/* Script Logic
-------------------------------------------------- */
// STEP 1: Check for geolocation API support
if (!navigator.geolocation) {
    // STEP 2: If not supported
    statusMsg.textContent = "Geolocation API is not supported by your browser.";
} else {
    // STEP 3: If supported, start the geolocation process
    statusMsg.textContent = "Locating…";

    // STEP 4: Call geolocation API
    navigator.geolocation.getCurrentPosition(success, error);
}
