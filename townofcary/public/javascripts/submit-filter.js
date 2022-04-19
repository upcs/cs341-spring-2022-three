//This file process form submissions from the filters form
//It takes in the inputs on the filters form and sends a post request
//author: Ben

//Submit a post request asking for the filtered table data
//startdate: String - 
function sendPostReq(startdate, enddate, crimes){
    
    //sends the post request to /routes/filters.js
    $.post('filters',
    {
        startdate: startdate,
        enddate: enddate,
        //TODO: implement crime filter
        //crimes are hard coded for now
        //-Ben
        crimes: JSON.stringify(crimes),
        location: false
    },
    function(data){
        //load data into table
        console.log(data);
        tableData = data.data;
        
        populateTable();
        //load data into charts
        removeData(barChart);
        removeData(donutChart);
        updateChart();
    });
}

//This function triggers whenever the submit button is pressed
$(document).ready(function(){
    //Starts the page with the data already loaded
    sendPostReq($("#startdate").val(), $("#enddate").val(), []);
    
    $(document).on('submit', '#filters', function(){
        console.log($("#startdate").val())
        console.log($("#enddate").val())
        sendPostReq($("#startdate").val(), $("#enddate").val(), []);
        
        //This function must return false or the page reloads
        //note: if this function fails to reach this line the page reloads
        return false;
    });
});