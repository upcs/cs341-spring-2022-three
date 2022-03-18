// This js file is for processing post requests sent from the client for filtered data from the database
// This should create the appropriate sql command and retrive the data from the database
// Any processing on the data should be done on the databases side or in this file and then
// only the data needed to display the information on the website should be sent back
// created by Ben C

var express = require('express');
var dbms = require('./dbms_promise.js');
var router = express.Router();

// Listens for post requests
router.post('/', function(req, res, next) {
    
    // This line should probably left here for testing purposes until the website is more functional
    //  -Ben
    console.log(req.body);
    
    var sqlCommand = "SELECT * FROM ORDERS";
    
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
    
    if(req.body.startdate != '' && req.body.startdate != ''){
        
        if(where){
            sqlCommand += " AND ";
        }
        else{
            sqlCommand += " WHERE ";
        }
        sqlCommand += "date BETWEEN " + req.body.startdate + " AND " + req.body.enddate + ";";
    }
    
    console.log(sqlCommand);
    
    res.send("banana");

    //code is commented out for now because the database is not functional
    //code is untested on account of this fact
    // -Ben
    /*db = dbms.dbquery(sqlCommand);
    
    db.then(
        function(value) {

            //this bit of code isn't written particularly efficiently
            //TODO: come back to this and optomize it (unless its determined to be inconsequential)
            // -Ben

            var crimeTypes = [];
            var counts = [];
            var foundCrime = false;

            for(const row of value){
                foundCrime = false;
                for(var i = 0; i < crimeTypes.length; i++){
                    if(row.CRIME == crimeTypes[i]){
                        foundCrime = true;
                        break;
                    }
                    if(row.CRIME == crimeTypes[i]){
                        counts[i]++;
                        foundCrime = true;
                        break;
                    }
                }
                if(!foundCrime){
                    crimeTypes.push(row.CRIME);
                    counts.push(1);
                }
            }

            var arr = [];
            for(var i = 0; i < crimeTypes.length; i++){
                var obj = {
                    crime: crimeTypes[i],
                    quantity: counts[i]
                }
                arr.push(obj);
            }

            var response = {data: arr};
            
            //send response to client
            res.send(response);
        },
        function(error) {
            console.log("err occured retriving data from database in filters.js");
        }
    );*/
});

module.exports = router;