// This js file is for processing post requests sent from the client for filtered data from the database
// This should create the appropriate sql command and retrive the data from the database
// Any processing on the data should be done on the databases side or in this file and then
// only the data needed to display the information on the website should be sent back
// created by Ben C

//--------------------------------------------------------------------------------
//              READ THIS FIRST
//--------------------------------------------------------------------------------
//TODO: the generated sql command has a bug where it does not use the proper order of operations
//if you are filter by data and multiple crimes it will say "crime1 or crime2 and between date1 and date 2"
//and so only crime2 will be filtered by date
// -Ben

var express = require('express');
var dbms = require('./dbms_promise.js');
var router = express.Router();

//generates a json object containing the number of crimes
//sorted by crime type
function countCrimes(data){
    var crimeTypes = [];
    var counts = [];
    var foundCrime = false;

    //this bit of code isn't written particularly efficiently
    //TODO: come back to this and optomize it (unless its determined to be inconsequential)
    // -Ben
    for(const row of data){
        foundCrime = false;
        for(var i = 0; i < crimeTypes.length; i++){
            if(row.crime == crimeTypes[i]){
                counts[i]++;
                foundCrime = true;
                break;
            }
        }
        if(!foundCrime){
            crimeTypes.push(row.crime);
            counts.push(1);
        }
    }
    
    console.log("crime types:");
    console.log(crimeTypes);
    console.log("counts: ");
    console.log(counts);

    var arr = [];
    for(var i = 0; i < crimeTypes.length; i++){
        var obj = {
            crime: crimeTypes[i],
            quantity: counts[i]
        }
        arr.push(obj);
    }

    console.log(arr);
    return arr;
}

// Listens for post requests
router.post('/', function(req, res, next) {
    
    //generates the sql command to send to the database
    var sqlCommand = "SELECT * FROM crimedata";
    
    //this variable is just ensuring that the WHERE part of the sql command is added only once
    var where = false;
    
    //adds any crime filters that are needed for the sql command
    if(req.body.crimes !== ''){
        typeSql = "crime = '" + req.body.crimes[0] + "'"
        for(var i = 1; i < req.body.crimes.length; i++){
            typeSql += " OR crime = '" + req.body.crimes[i] + "'"
        }
        sqlCommand += " WHERE " + typeSql;
        where = true;
    }
    
    //adds any date range filters that are needed for the sql command
    if(req.body.startdate != '' && req.body.enddate != ''){
        if(where){
            sqlCommand += " AND ";
        }
        else{
            sqlCommand += " WHERE ";
        }
        sqlCommand += "date BETWEEN '" + req.body.startdate + "' AND '" + req.body.enddate + "';";
    }
    
    //the sql command generated should be safe against sql injection exploits
    //regardless this code should be returned to determine its safety
    console.log("sending sql command to database: \"" + sqlCommand + "\"");

    //sends the sql command to the database
    db = dbms.dbquery(sqlCommand);
    db.then(
        function(value) {
            //send response to client
            res.send({data: countCrimes(value)});
        },
        //in case of an error
        function(error) {
            console.log("err occured retriving data from database in filters.js");
            res.send("error");
        }
    );
});

module.exports = router;