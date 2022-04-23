// The two buttons that make the sidebar visible and invisible
var o = document.getElementById("one");
var to = document.getElementById("two");
// Automatically assigns the button that closes the sidebar as invisible
to.style.display = 'none';

function openNav() {
    // Assigns 300px of width for the sidebar
    document.getElementById("mySidebar").style.width = "300px";
    // Moves the content 300px over to the right
    document.getElementById("main").style.marginLeft = "300px";
    // "One" is now invisible
	o.style.display = 'none';
    // "Two" is now visible
    to.style.display = '';
}

// Closes the navigation menu
function closeNav() {
    // Removes the sidebar
    document.getElementById("mySidebar").style.width = "0";
    // Returns the page back to full screen assignment
    document.getElementById("main").style.marginLeft= "0";
    // "One" is now visible
	o.style.display = '';
    // "Two" is now invisible
    to.style.display = 'none';
}
module.exports = {openNav: openNav, closeNav: closeNav};