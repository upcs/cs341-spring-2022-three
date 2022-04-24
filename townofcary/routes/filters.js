// This js file is for processing post requests sent from the client for filtered data from the database
// This should create the appropriate sql command and retrive the data from the database
// Any processing on the data should be done on the databases side or in this file and then
// only the data needed to display the information on the website should be sent back
// created by Ben C

var express = require('express');
var dbms = require('./dbms_promise.js');
var router = express.Router();

// ---------------------- POST /filters -----------------------------------
// Post requests sent to this router are received as an object with 3 fields
// startdate, enddate -> These fields must be strings matching the HTML format for
// dates used by <input type="date">, which is "YYYY-MM-DD"
// If the you wish to ignore the date range, set startdate or enddate to ""
// crimes -> This must be a JSON string representing an array. Use JSON.stringify(myArr)
// If the you wish to ignore the crime type, set crimes to "[]"
//
// Replies are an object with 3 fields
// data -> This will contain an array of Objects that each have 2 fields
// These objects have the fields crime and quantity. crime will be a given crime type, and
// quantity will be the number of matching reports that fall under that type
// lat, long -> These are arrays of equal size giving the coords of all matching crime reports
//
// Example:
// Request - {startdate: "2012-04-08", enddate: "2012-04-14", crimes: "[Fraud]"}
// Response - {data: [{crime: 'Fraud', quantity: 3}], lat: ['35.77', '35.22', '34.95'], long: ['-78.65', '-79.12', '-78.83']}
// From this we can tell 3 counts of Fraud occured the week of April 4th, 2012 and they happened
// at the coordinates 35.77,-78.65 and 35.22,-79,12 and 34.95,-78.83
// -------------------------------------------------------------------------

//generates an object containing the number of crimes sorted by crime type
//data: Obj[] - Each obj is a crime report and contains date and crime
//returns: Obj[] - Each obj contains a crime type, and the quantity of those reports
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

    //converts the array to an object
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
//obj: Obj - the post request data w/ start/enddate, crimes, location
//returns: String - the appropriate SQL command for the given filters
function generateSql(obj){
    
    var sqlCommand = "SELECT * FROM crimedata";

    //this variable is just ensuring that the WHERE part of the sql command is added only once
    var where = false;

    //converts crimes from a JSON string back to an array
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

function getLocation(data){
    var arr = [];
    
    for(const row of data){
        //remove space from the location string
        var str = row.location.replace(/\s/g, "");
        //split the string using the semicolon separator
        var coord = str.split(';');
        //add values to the arrays
        var obj = {
            lat: coord[0],
            long: coord[1],
            crime: row.crime
        }
        arr.push(obj);
    }
    
    return arr;
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
            res.send({data: countCrimes(value), location: getLocation(value)});
        },
        //in case of an error
        function(error) {
            console.log("err occured retriving data from database in filters.js");
            res.send(error);
        }
    );
});

module.exports = router;