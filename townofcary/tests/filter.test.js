//This file is for unit testing POST requests
//We run this will send POST requests to filters.js and confirm that the 
//responses are as expected
//This file will not be accurate if the database data is altered
//author: Ben Chong

//We use the supertest module on top of jest to make this work
const request = require("supertest");
const app = require("../app.js");

//These arrays are hard coded values that the tests cases expect
const arr0 = [{crime: 'Fraud', quantity: 9145}, {crime: 'All Other Offenses', quantity: 13735},
               {crime: 'Gambling', quantity: 6}, {crime: 'Murder', quantity: 23},
               {crime: 'Larceny', quantity: 30627}, {crime: 'Vandalism', quantity: 9828},
               {crime: 'Suicide', quantity: 1100}, {crime: 'Traffic Except DWI', quantity: 2475},
               {crime: 'DUI', quantity: 3031}, {crime: 'Burglary', quantity: 7272},
               {crime: 'Forgery', quantity: 1339}, {crime: 'Disorderly Conduct', quantity: 403},
               {crime: 'Drunkenness', quantity: 351}, {crime: 'Drugs', quantity: 5223},
               {crime: 'Pornography', quantity: 54}, {crime: 'Aggravated Assault', quantity: 963},
               {crime: 'Simple Assault', quantity: 8082}, {crime: 'Arson', quantity: 149},
               {crime: 'Embezzlement', quantity: 895}, {crime: 'Weapons', quantity: 566},
               {crime: 'Stolen Property', quantity: 355}, {crime: 'Alcohol Offenses', quantity: 335},
               {crime: 'Missing Person', quantity: 920}, {crime: 'Motor Vehicle Theft', quantity: 1978},
               {crime: 'Non Negligent Traff', quantity: 10}, {crime: 'Calls for Service', quantity: 21},
               {crime: 'Non Criminal Detain', quantity: 9}];
const arr1lat = ['35.774406818','35.766509822','35.781024182','35.779745957','35.825318389','35.764065191','35.789466258',
            '35.820229169','35.808786933','35.7871584','35.762975307','35.798011394','35.77675031','35.787510627',
            '35.789466258','35.824707449','35.831362842','35.773850825','35.789856146','35.810369074','35.827463321',
            '35.759584632','35.705082029','35.759584632','35.827463321','35.790343238','35.758150457','35.851055023',
            '35.785593284','35.689870597','35.790231889','35.689870597','35.797435521','35.79560362','35.785510438',
            '35.785058928','35.766969074','35.770096458','35.778260922','35.79468183','35.766969074','35.764065191',
            '35.843285628','35.767980887','35.773850825','35.824350443','35.855401429','35.856058071','35.694559574',
            '35.764065191','35.787510627','35.74457967','35.858162855','35.825871936','35.79560362','35.79888932',
            '35.755363988','35.762083926','35.773850825','35.865377008','35.749250454','35.740658825','35.773850825',
            '35.808093159','35.818399948','35.770096458','35.793838856','35.743768031','35.689870597','35.773959221',
            '35.773850825','35.767111893','35.749250454','35.773850825','35.783470538','35.744880028','35.79105849',
            '35.790343238','35.7871584','35.843200371','35.773522458','35.796241745','35.689870597','35.689870597',
            '35.736453643','35.801059759','35.773850825','35.805389811','35.757381749'];
const arr1long = ['-78.79265129','-78.78973253','-78.82537181','-78.7673183','-78.84924941','-78.74339687',
            '-78.77949609','-78.89986632','-78.85802727','-78.85223247','-78.7476475','-78.79596385','-78.76675379',
            '-78.76220496','-78.77949609','-78.89955886','-78.85286013','-78.75931174','-78.85661099','-78.78433885',
            '-78.77008005','-78.74209609','-78.7871363','-78.74209609','-78.77008005','-78.83026797','-78.73940464',
            '-78.89338589','-78.77004774','-78.77693882','-78.84898942','-78.77693882','-78.81367235','-78.81629082',
            '-78.81214547','-78.80988371','-78.73934253','-78.74415012','-78.79732767','-78.79270132','-78.73934253',
            '-78.74339687','-78.90834178','-78.79448853','-78.75931174','-78.89949184','-78.89834803','-78.89716649',
            '-78.77214385','-78.74339687','-78.76220496','-78.75961447','-78.8972579','-78.91365818','-78.81629082',
            '-78.79494995','-78.80699125','-78.80006562','-78.75931174','-78.81496399','-78.7979737','-78.7800162',
            '-78.75931174','-78.76467351','-78.85608774','-78.74415012','-78.76862193','-78.75936791','-78.77693882',
            '-78.8224541','-78.75931174','-78.741735','-78.7979737','-78.75931174','-78.8100362','-78.76607054',
            '-78.76418397','-78.83026797','-78.85223247','-78.90442875','-78.81762202','-78.81668138','-78.77693882',
            '-78.77693882','-78.785302','-78.77024951','-78.75931174','-78.86673437','-78.76677591'];

describe("Test Sending Post Requests to /filters", () => {
    //Testing with location as false and not filtering by any params
    //This first test is commented in detail to explain what's going on in these tests
    test("Location False and Capturing All Data", (done) => {
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
    //Testing with location set to true and a small data range
    //Ideally this test would capture all data but it would be impractical
    //because the response tens of thousands of entries long
    test("Location True and Filtering by Date", (done) => {
        request(app)
        .post("/filters")
        .send({
            startdate: "2015-03-09",
            enddate: "2015-03-15",
            crimes: JSON.stringify([]),
            location: true
        })
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            try {
                expect(res.body.long).toEqual(arr1long);
                expect(res.body.lat).toEqual(arr1lat);
                done();
            } catch (error) {
                done(error);
            }
        });
    });
});
