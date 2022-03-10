// The following item is entirely for testing purposes of filters.js
// This is serving as a placeholder for testing the filters functionality
// since the filter buttons that are implemented are not finished yet
// -Ben

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
        }, 'json');
    });
});