//This file is for unit testing POST requests
//We run this will send POST requests to filters.js and confirm that the 
//responses are as expected
//This file will not be accurate if the database data is altered
//author: Ben Chong

//We use the supertest module on top of jest to make this work
const request = require("supertest");
const app = require("../app.js");
jest.setTimeout(20000);

//These arrays are hard coded values that the tests cases expect
const arr0 = [{crime: 'Fraud', quantity: 9150}, {crime: 'All Other Offenses', quantity: 13743},
               {crime: 'Gambling', quantity: 6}, {crime: 'Murder', quantity: 23},
               {crime: 'Larceny', quantity: 30630}, {crime: 'Vandalism', quantity: 9828},
               {crime: 'Suicide', quantity: 1100}, {crime: 'Traffic Except DWI', quantity: 2475},
               {crime: 'DUI', quantity: 3031}, {crime: 'Burglary', quantity: 7272},
               {crime: 'Forgery', quantity: 1341}, {crime: 'Disorderly Conduct', quantity: 403},
               {crime: 'Drunkenness', quantity: 351}, {crime: 'Drugs', quantity: 5223},
               {crime: 'Pornography', quantity: 54}, {crime: 'Aggravated Assault', quantity: 963},
               {crime: 'Simple Assault', quantity: 8083}, {crime: 'Arson', quantity: 149},
               {crime: 'Embezzlement', quantity: 895}, {crime: 'Weapons', quantity: 566},
               {crime: 'Stolen Property', quantity: 355}, {crime: 'Alcohol Offenses', quantity: 335},
               {crime: 'Missing Person', quantity: 920}, {crime: 'Motor Vehicle Theft', quantity: 1978},
               {crime: 'Non Negligent Traff', quantity: 10}, {crime: 'Calls for Service', quantity: 21},
               {crime: 'Non Criminal Detain', quantity: 9}];
const arr1 = [{"crime": "Motor Vehicle Theft", "lat": "35.773522458", "long": "-78.81762202"}];

describe("Test Sending Post Requests to /filters", () => {
    //Testing not filtering by any params
    //This first test is commented in detail to explain what's going on in these tests
    test("Capturing All Data", (done) => {
        //testing requests are dependent on app.js
        request(app)
        //send a post request to the filters router
        .post("/filters")
        //send the post request with the following data
        .send({
            startdate: "",
            enddate: "",
            crimes: JSON.stringify([]),
            location: false
        })
        //expect a reply with a 200 OK status
        .expect(200)
        //run this code once the response is rcvd
        .end((err, res) => {
            //if an error is rcvd fail the test
            if (err) return done(err);
            try {
                //if the response matches the expected data
                expect(res.body.data).toEqual(arr0);
                //the test succeeds
                done();
            //if the response does not match the expected data
            } catch (error) {
                //the test fails
                done(error);
            }
        });
    });
    //Testing with a small data range
    //Ideally this test would capture all data but it would be impractical
    //because the response tens of thousands of entries long
    test("Filtering by Date and Crime", (done) => {
        request(app)
        .post("/filters")
        .send({
            startdate: "2015-03-09",
            enddate: "2015-03-12",
            crimes: JSON.stringify(["Motor Vehicle Theft"])
        })
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            try {
                expect(res.body.location).toEqual(arr1);
                done();
            } catch (error) {
                done(error);
            }
        });
    });
});
