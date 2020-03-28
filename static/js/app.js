// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");
  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");
    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    }
    );
  });
}

// Challenge updates starts here: 
// note about challenge: used object insted of d3.selectAll() to optimise function below. 


function filterTable(filters,arr) {
  // to not mutated original data
  let filteredData = arr.map(item=>item)
  // transform filters object into array of arrays 
  Object.entries(filters).forEach(([key,val]) => {
  //  check if users input filter
    if(val){
      // using dinamic key value
filteredData=filteredData.filter(row => row[key] === val);
    }
  });
  buildTable(filteredData);

  
}

// create a function
function handleClick() {
  // Grab the info value from the filter
  const filters = {
    datetime: d3.select("#datetime").property("value"),
    city: d3.select("#city").property("value"),
    state: d3.select("#state").property("value"),
    country: d3.select("#country").property("value"),
    shape: d3.select("#shape").property("value"),
  }
  
filterTable(filters,tableData);

// challenge update finishes here




 
  // Rebuild the table using the filtered data
  // @NOTE: If no date was entered, then filteredData will
  // just be the original tableData.
  
}
// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);
// Build the table when the page loads
buildTable(tableData);
