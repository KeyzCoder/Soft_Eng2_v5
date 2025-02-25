$(document).ready(function() {
  fetch('http://localhost:3000/api/farmers')
    .then(response => response.json())
    .then(data => {
      console.log("Farmers data:", data); // Debugging
      
      let rows = "";
      data.forEach(function(farmer) {
        rows += `<tr>
          <td>${farmer.Name || ''}</td>
          <td>${farmer.Location || ''}</td>
          <td>${farmer['Phone_Number'] || ''}</td>
          <td>${farmer['Crop_Type'] || ''}</td>
          <td>${farmer['Farm_Size'] || ''}</td>
          <td>${farmer['Average_Yield'] || ''}</td>
        </tr>`;
      });

      // ✅ Insert table rows
      $("#dataTable tbody").html(rows);
      $("#dataTable").DataTable();

      // ✅ Show the total number of farmers
      $("#totalFarmers").text(`Total Farmers: ${data.length}`);
    })
    .catch(error => console.error("Error fetching farmers data:", error));
});
