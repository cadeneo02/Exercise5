const output = document.getElementById("output");
const loading1 = document.getElementById("loading1");
const loading2 = document.getElementById("loading2");

// Fetch both JSON files in parallel using Promise.all
Promise.all([
  fetch("destination1.json").then(res => {
    if (!res.ok) throw new Error("Destination 1 failed to load.");
    return res.json();
  }),
  fetch("destination2.json").then(res => {
    if (!res.ok) throw new Error("Destination 2 failed to load.");
    return res.json();
  })
])
.then(([data1, data2]) => {
  // Hide loading indicators
  loading1.hidden = true;
  loading2.hidden = true;

  // Log to console
  console.log("Destination 1:", data1);
  console.log("Destination 2:", data2);

  // Merge output into display
  output.innerHTML = `
    <h2>${data1.destination} & ${data2.destination}</h2>
    <p><strong>Visited:</strong> ${data1.visited && data2.visited ? "Both" : "One or None"}</p>

    <h3>Top Attractions</h3>
    <ul>
      ${data1.attractions.concat(data2.attractions).map(attraction => `<li>${attraction}</li>`).join("")}
    </ul>

    <h3>Best Times to Visit</h3>
    <p>${data1.destination}: ${data1.bestTimeToVisit}</p>
    <p>${data2.destination}: ${data2.bestTimeToVisit}</p>
  `;
})
.catch(error => {
  // Hide any loading indicators
  loading1.hidden = true;
  loading2.hidden = true;

  // Display and log error
  console.error("Error:", error);
  output.innerHTML = `<p style="color: red;">Failed to load data: ${error.message}</p>`;
});