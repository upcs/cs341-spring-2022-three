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
        crimes: JSON.stringify(crimes)
    },

    function(data){
        //load data into table
        tableData = data.data;
        mapData = data.location;
        populateTable();

        //load data into charts
        updateChart();

        //load markers onto the map
        updateMarkers(mapData);
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
        
        try{
            var checkboxes = $("[type=checkbox]");
            var crimes = [];

            for(var i = 0; i < checkboxes.length; i++){
                if(checkboxes[i].checked){
                    crimes.push(checkboxes[i].value);
                }
            }

            sendPostReq($("#startdate").val(), $("#enddate").val(), crimes);
        }
        catch(error){
            console.log(error);
        }
        
        //This function must return false or the page reloads
        //note: if this function fails to reach this line the page reloads
        return false;
    });
});