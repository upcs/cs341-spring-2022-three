// Commented on both of these functions - Anna
function incidentDrop() {
  // Declaration of variables to be assigned
  var input, filter, ul, li, a, i, txtValue;
  // input: The input as typed into the filter bar
  input = document.getElementById('myInput');
  // filter: Turns the input into all uppercase letters
  filter = input.value.toUpperCase();
  // ul: Grabs the container for the bulleted list with possible filter values
  ul = document.getElementById("myUL");
  // li: Grabs the bulleted values inside of the ul container
  li = ul.getElementsByTagName('li');

  // For all li items, compare to the textbox input and determine if there's a matching sequence
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
module.exports = {incidentDrop: incidentDrop};