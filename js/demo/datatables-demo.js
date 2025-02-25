$(document).ready(function() {
  fetch('http://localhost:3000/api/farmers')
    .then(response => response.json())
    .then(data => {
      console.log("Farmers data:", data); // Check the structure
      let rows = "";
      data.forEach(function(farmer) {
        // Adjust the key here if needed:
        rows += `<tr onclick="setSelectedFarmer(this)" data-id="1">
          <td>${farmer.Name || ''}</td>
          <td>${farmer.Location || ''}</td>
          <td>${farmer['Phone Number'] || ''}</td>
          <td>${farmer['Crop Type'] || ''}</td>
          <td>${farmer['Farm Size'] || ''}</td>
          <td>${farmer['Average Yield'] || ''}</td>
        </tr>`;
      });
      $("#dataTable tbody").html(rows);
      $("#dataTable").DataTable();
    })
    .catch(error => console.error("Error fetching farmers data:", error));
});
