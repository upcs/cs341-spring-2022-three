var o = document.getElementById("one");
var to = document.getElementById("two");
to.style.display = 'none';

function openNav() {
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
	o.style.display = 'none';
    to.style.display = '';
}

function closeNav() {

    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
	o.style.display = '';
    to.style.display = 'none';
}