let travelData = [];

// Fetch data from JSON file
fetch("travel_recommendation_api.json")
  .then((response) => response.json())
  .then((data) => {
    travelData = data.places; // Ensure your JSON has a "places" array
    console.log("Travel data loaded:", travelData);
  })
  .catch((error) => {
    console.error("Error loading travel data:", error);
  });

// Perform search based on keyword
function performSearch() {
  const input = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();
  const resultsDiv = document.getElementById("searchResults");
  resultsDiv.innerHTML = ""; // Clear old results

  if (!input) {
    resultsDiv.textContent = "Please enter a search keyword.";
    return;
  }

  // Normalize input for matching
  let keyword = "";
  if (["beach", "beaches"].includes(input)) {
    keyword = "beach";
  } else if (["temple", "temples"].includes(input)) {
    keyword = "temple";
  } else {
    keyword = input; // Assume country
  }

  // Filter matching places
  const matchedPlaces = travelData.filter((place) => {
    const categoryMatch =
      place.category && place.category.toLowerCase().includes(keyword);
    const countryMatch =
      place.country && place.country.toLowerCase().includes(keyword);
    return categoryMatch || countryMatch;
  });

  if (matchedPlaces.length === 0) {
    resultsDiv.textContent = "No recommendations found for your search.";
    return;
  }

  // Show top 2 matching results
  matchedPlaces.slice(0, 2).forEach((place) => {
    const placeDiv = document.createElement("div");
    placeDiv.style.margin = "20px 0";
    placeDiv.style.padding = "15px";
    placeDiv.style.border = "1px solid #ccc";
    placeDiv.style.borderRadius = "8px";
    placeDiv.style.backgroundColor = "#f9f9f9";

    const name = document.createElement("h2");
    name.textContent = place.name;

    const img = document.createElement("img");
    img.src = place.imageUrl;
    img.alt = place.name;
    img.style.width = "300px";
    img.style.borderRadius = "5px";
    img.style.marginTop = "10px";

    const description = document.createElement("p");
    description.textContent = place.description;

    placeDiv.appendChild(name);
    placeDiv.appendChild(img);
    placeDiv.appendChild(description);

    // Optional: show time if timezone exists
    if (place.timezone) {
      const timePara = document.createElement("p");
      const timeNow = new Date().toLocaleTimeString("en-US", {
        timeZone: place.timezone,
        hour12: true,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
      timePara.textContent = `Current time in ${place.country}: ${timeNow}`;
      placeDiv.appendChild(timePara);
    }

    resultsDiv.appendChild(placeDiv);
  });
}

// Clear search and results
function clearResults() {
  document.getElementById("searchInput").value = "";
  document.getElementById("searchResults").innerHTML = "";
}

const options = {
  timeZone: "America/New_York",
  hour12: true,
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
const newYorkTime = new Date().toLocaleTimeString("en-US", options);
console.log("Current time in New York:", newYorkTime);
