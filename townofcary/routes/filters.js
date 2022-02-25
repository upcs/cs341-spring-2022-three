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
    if(typeof req.body.crimes !== 'undefined'){
        typeSql = "crime = '" + req.body.crimes[0] + "'"
        for(var i = 1; i < req.body.crimes.length; i++){
            typeSql += " OR crime = '" + req.body.crimes[i] + "'"
        }
        sqlCommand += " WHERE " + typeSql;
        where = true;
    }
    
    if(req.body.startdate != "1000-01-01"){
        
        if(where){
            sqlCommand += " AND ";
        }
        else{
            sqlCommand += " WHERE ";
        }
        sqlCommand += "date BETWEEN " + req.body.startdate + " AND " + req.body.enddate + ";";
    }
    
    console.log(sqlCommand);
    
    //code is commented out for now because the database is not functional
    // -Ben
    /*db = dbms.dbquery(sqlCommand);
    
    db.then(
        function(value) {
            
            //not sure as of yet how data should be sent back
            
            //send response to client
            res.send(value);
        },
        function(error) {
            console.log("err occured retriving data from database in filters.js");
        }
    );*/
});

module.exports = router;