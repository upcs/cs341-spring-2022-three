/*
    Source: https://betterprogramming.pub/sort-and-filter-dynamic-data-in-table-with-javascript-e7a1d2025e3c
*/

// Connects to where the table will display in the table
var table = document.getElementById('mytable');
// Allows for CSV notation input of data from API
var tableData = [];
// Symbols for changing alphabet order of data
var caretUpClassName = 'fa fa-caret-up';
var caretDownClassName = 'fa fa-caret-down';

// 
const sort_by = (field, reverse, primer) => {

  const key = primer ?
    function(x) {
      return primer(x[field]);
    } :
    function(x) {
      return x[field];
    };

  reverse = !reverse ? 1 : -1;

  return function(a, b) {
    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  };
};

function clearArrow() {
  let carets = document.getElementsByClassName('caret'); 
  for (let caret of carets) {
    caret.className = "caret";
  }
}

function toggleArrow(event) {
  let element = event.target;
  let caret, field, reverse;
  if (element.tagName === 'SPAN') {
    caret = element.getElementsByClassName('caret')[0];
    field = element.id
  }
  else {
    caret = element;
    field = element.parentElement.id
  }

  let iconClassName = caret.className;
  clearArrow();
  if (iconClassName.includes(caretUpClassName)) {
    caret.className = `caret ${caretDownClassName}`;
    reverse = false;
  } else {
    reverse = true;
    caret.className = `caret ${caretUpClassName}`;
  }

  tableData.sort(sort_by(field, reverse));
  populateTable();
}

function populateTable() {
  table.innerHTML = '';
  for (let data of tableData) {
    let row = table.insertRow(-1);
    let crime = row.insertCell(0);
    crime.innerHTML = data.crime;

    let quantity = row.insertCell(1);
    quantity.innerHTML = data.quantity;
  }
}

// Actually populates the table
populateTable();

// Finds the table column elements
let tableColumns = document.getElementsByClassName('table-column');

// Iterates through each table column
for (let column of tableColumns) {
  // Assigns a click listener in the column header of each column
  column.addEventListener('click', function(event) {
    // Initiate arrow with click
    toggleArrow(event);
  });
}

module.exports = {
  tableData: tableData,
  toggleArrow: toggleArrow,
  populateTable: populateTable
};