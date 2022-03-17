// The following item is entirely for testing purposes of filters.js
// This is serving as a placeholder for testing the filters functionality
// since the filter buttons that are implemented are not finished yet
// Do move this code when able however!
// -Ben

//This function updates the table with the new data 
//note: totally removes any existing data in the table
//-Ben
function createTable(data){
    $("#table").find("tr:not(:first)").remove();
    for(var i = 0; i < data.data.length; i++){
        console.log(data.data[i]);
        var table = document.getElementById("table");
        var row = table.insertRow(-1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        cell0.appendChild(document.createTextNode(data.data[i].crime));
        cell1.appendChild(document.createTextNode(data.data[i].quantity));
    }
}

$(document).ready(function(){
    $('#testing').click(function(){
        // This line of code affects all jquery requests
        // Alternatives and risks should be considered
        //  -Ben
        $.ajaxSetup({traditional: true});
        
        // For now no date range selected is signified by setting the start date to 1000-01-01
        // If no crime types are selected simply send an empty array
        // Location filtering cannot be implemented until we determine our map.api
        //  -Ben
        $.post('filters',
        {
            startdate: "2008-10-27",
            enddate: "2010-11-30", 
            crimes: ["Fraud", "Alcohol Offenses"],
            location: "location"
        },
        function(data){
            createTable(data);
        }, 'json');

        //TODO: REMOVE THIS
        //This part is only for testing purposes because the post cannot get a response right now
        //-Ben
        var data = {data: [{crime: "Fraud", quantity: 19}, {crime: "DUI", quantity: 6}, {crime: "Robbery", quantity: 24}]};
        createTable(data);
    });
});