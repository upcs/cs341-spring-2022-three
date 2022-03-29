var table = document.getElementById('mytable');
var input = document.getElementById('myinput');
var tableData = [{name: 'Onion', quantity: 29, price: 1.2, expiry: '2021-09-12'}, {name: 'Apple', quantity: 55, price: 3.3, expiry: '2021-09-22'}, {name: 'Potato', quantity: 25, price: 2.5, expiry: '2021-09-18'}, {name: 'Carrot', quantity: 8, price: 0.8, expiry: '2021-09-25'}];
var caretUpClassName = 'fa fa-caret-up';
var caretDownClassName = 'fa fa-caret-down';

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
    let name = row.insertCell(0);
    name.innerHTML = data.name;

    let quantity = row.insertCell(1);
    quantity.innerHTML = data.quantity;

    let price = row.insertCell(2);
    price.innerHTML = data.price;

    let expiry = row.insertCell(3);
    expiry.innerHTML = data.expiry;
  }

  filterTable();
}


function filterTable() {
  let filter = input.value.toUpperCase();
  rows = table.getElementsByTagName("TR");
  let flag = false;

  for (let row of rows) {
    let cells = row.getElementsByTagName("TD");
    for (let cell of cells) {
      if (cell.textContent.toUpperCase().indexOf(filter) > -1) {
        if (filter) {
          cell.style.backgroundColor = 'yellow';
        } else {
          cell.style.backgroundColor = '';
        }

        flag = true;
      } else {
        cell.style.backgroundColor = '';
      }
    }

    if (flag) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }

    flag = false;
  }
}


populateTable();

let tableColumns = document.getElementsByClassName('table-column');

for (let column of tableColumns) {
  column.addEventListener('click', function(event) {
    toggleArrow(event);
  });
}

input.addEventListener('keyup', function(event) {
  filterTable();
});