const request = require("supertest");
const app = require("../app.js");

const arr = [{crime: 'Fraud', quantity: 9145}, {crime: 'All Other Offenses', quantity: 13735},
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

describe("Test example", () => {
    // Hidden for simplicity
    test("POST /filters", (done) => {
      request(app)
        .post("/filters")
        .expect("Content-Type", /json/)
        .send({
            startdate: "2000-01-01",
            enddate: "2023-01-01",
            crimes: undefined,
            location: "location"
        })
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            console.log(res.body.data);
            if(res.body.data != arr){
                return done("bad");
            }
            return done();
          });
    });
});
