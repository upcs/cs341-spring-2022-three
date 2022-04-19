// This js file is for processing post requests sent from the client for filtered data from the database
// This should create the appropriate sql command and retrive the data from the database
// Any processing on the data should be done on the databases side or in this file and then
// only the data needed to display the information on the website should be sent back
// created by Ben C

var express = require('express');
var dbms = require('./dbms_promise.js');
var router = express.Router();

//generates a js object containing the number of crimes
//sorted by crime type
function countCrimes(data){
    var crimeTypes = [];
    var counts = [];
    var foundCrime = false;
    
    //runs through each data point
    for(const row of data){
        foundCrime = false;
        //if the crime is already in the array add 1 to the count
        for(var i = 0; i < crimeTypes.length; i++){
            if(row.crime == crimeTypes[i]){
                counts[i]++;
                foundCrime = true;
                break;
            }
        }
        //if the crime is not in our array add it to the array with a count of 1
        if(!foundCrime){
            crimeTypes.push(row.crime);
            counts.push(1);
        }
    }

    //converts the array to a js object
    var arr = [];
    for(var i = 0; i < crimeTypes.length; i++){
        var obj = {
            crime: crimeTypes[i],
            quantity: counts[i]
        }
        arr.push(obj);
    }
    
    return arr;
}

//generates an sql command to send to the database
function generateSql(obj){
    
    var sqlCommand = "SELECT * FROM crimedata";

    //this variable is just ensuring that the WHERE part of the sql command is added only once
    var where = false;

    crimes = JSON.parse(obj.crimes);

    //adds any crime filters that are needed for the sql command
    if(crimes.length > 0){
        typeSql = "(crime = '" + crimes[0] + "'";
        for(var i = 1; i < crimes.length; i++){
            typeSql += " OR crime = '" + crimes[i] + "'";
        }
        typeSql += ")";
        sqlCommand += " WHERE " + typeSql;
        where = true;
    }

    //adds any date range filters that are needed for the sql command
    if(obj.startdate != '' && obj.enddate != ''){
        if(where){
            sqlCommand += " AND ";
        }
        else{
            sqlCommand += " WHERE ";
        }
        sqlCommand += "date BETWEEN '" + obj.startdate + "' AND '" + obj.enddate + "';";
    }

    return sqlCommand;
}

function getCoords(data){
    var lat = [];
    var long = [];
    
    for(const row of data){
        //remove space from the location string
        var str = row.location.replace(/\s/g, "");
        //split the string using the semicolon separator
        var arr = str.split(';');
        //add values to the arrays
        lat.push(arr[0]);
        long.push(arr[1]);
    }
    
    return [lat, long];
}

// Listens for post requests
router.post('/', function(req, res, next) {

    sqlCommand = generateSql(req.body);
    
    //the sql command generated should be safe against sql injection exploits
    //regardless this code should be returned to determine its safety
    console.log("sending sql command to database: \"" + sqlCommand + "\"");

    //sends the sql command to the database
    db = dbms.dbquery(sqlCommand);
    db.then(
        function(value) {
            //send response to client
            console.log(req.body)
            if(JSON.parse(req.body.location)){
                var coords = getCoords(value);
                res.send({lat: coords[0], long: coords[1]});
            }
            else{
                res.send({data: countCrimes(value)});
            }
        },
        //in case of an error
        function(error) {
            console.log("err occured retriving data from database in filters.js");
            res.send(error);
        }
    );
});

module.exports = router;