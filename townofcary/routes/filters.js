// This js file is for processing post requests sent from the client for filtered data from the database
// This should create the appropriate sql command and retrive the data from the database
// Any processing on the data should be done on the databases side or in this file and then
// only the data needed to display the information on the website should be sent back
// created by Ben C

var express = require('express');
var dbms = require('./dbms_promise.js');
var router = express.Router();

//generates a json object containing the number of crimes
//sorted by crime type
function countCrimes(data){
    var crimeTypes = [];
    var counts = [];
    var foundCrime = false;

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

//generates an sql command to send to the database
function generateSql(obj){
    
    var sqlCommand = "SELECT * FROM crimedata";
    
    //this variable is just ensuring that the WHERE part of the sql command is added only once
    var where = false;
    
    //adds any crime filters that are needed for the sql command
    if(obj.crimes !== ''){
        typeSql = "(crime = '" + obj.crimes[0] + "'";
        for(var i = 1; i < obj.crimes.length; i++){
            typeSql += " OR crime = '" + obj.crimes[i] + "'";
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