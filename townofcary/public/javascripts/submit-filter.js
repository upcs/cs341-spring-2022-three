//This file process form submissions from the filters form
//It takes in the inputs on the filters form and sends a post request
//author: Ben

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
            crimes: [],
            location: "location"
        },
        function(data){
            //load data into table
            tableData = data.data;
            populateTable();
            //load data into charts
            removeData(barChart);
            removeData(donutChart);
            updateChart();
        }, 'json');
        
        //This function must return false or the page reloads
        //note: if this function fails to reach this line the page reloads
        return false;
    });
});