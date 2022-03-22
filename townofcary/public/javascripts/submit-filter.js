//This file process form submissions from the filters form
//It takes in the inputs on the filters form and sends a post request
//author: Ben

//This function updates the table with the new data 
//note: totally removes any existing data in the table
function createTable(data){
    $("#table").find("tr:not(:first)").remove();
    for(var i = 0; i < data.data.length; i++){
        var table = document.getElementById("table");
        var row = table.insertRow(-1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        cell0.appendChild(document.createTextNode(data.data[i].crime));
        cell1.appendChild(document.createTextNode(data.data[i].quantity));
    }
}

//This function triggers whenever the submit button is pressed
$(document).ready(function(){
    $(document).on('submit', '#filters', function(){

        // This line of code affects all jquery requests
        // Alternatives and risks should be considered
        //  -Ben
        $.ajaxSetup({traditional: true});
        
        //sends the post request to /routes/filters.js
        $.post('filters',
        {
            startdate: $("#startdate").val(),
            enddate: $("#enddate").val(),
            //TODO: implement crime and location filter
            //crimes and location are hard coded for now
            //-Ben
            crimes: ["Fraud", "Alcohol Offenses"],
            location: "location"
        },
        function(data){
            createTable(data);
        }, 'json');

        //This function must return false or the page reloads
        //note: if this function fails to reach this line the page reloads
        return false;
    });
});