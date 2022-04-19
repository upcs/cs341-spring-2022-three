//This file process form submissions from the filters form
//It takes in the inputs on the filters form and sends a post request
//author: Ben

//Submit a post request asking for the filtered table data
//startdate: String - start date given in the form "YYYY-MM-DD"
//enddate: String - end date given in the form "YYYY-MM-DD"
//crimes: String[] - all crime types you wish to filter for
function sendPostReq(startdate, enddate, crimes){
    
    //sends the post request to /routes/filters.js
    $.post('filters',
    {
        startdate: startdate,
        enddate: enddate,
        crimes: JSON.stringify(crimes),
        location: false
    },
    function(data){
        //load data into table
        tableData = data.data;
        populateTable();

        //load data into charts
        removeData(barChart);
        removeData(donutChart);
        updateChart();
    });
}

$(document).ready(function(){
    //Starts the page with the data already loaded
    sendPostReq($("#startdate").val(), $("#enddate").val(), []);
    
    //This function triggers whenever the submit button is pressed
    $(document).on('submit', '#filters', function(){
        //TODO: implement crime filter
        //crimes are hard coded for now
        //-Ben
        sendPostReq($("#startdate").val(), $("#enddate").val(), []);
        
        //This function must return false or the page reloads
        //note: if this function fails to reach this line the page reloads
        return false;
    });
});