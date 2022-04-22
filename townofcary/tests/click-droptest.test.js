//Unit testing file for click-drop.js
//Author: Connor Morgan

//test the click drop functionality
var fs = require('fs');
const { listenerCount } = require('process');

//make sure file exists
var js = fs.readFileSync('public/javascripts/click-drop.js', 'utf-8');
    

test('incident drop down and district drop down filter functionality', () => {
    expect(js).toEqual(expect.anything());

    var html = fs.readFileSync('public/index.html', 'utf-8');
    expect(html).toEqual(expect.anything());
    document.body.innerHTML = html;

    const dropdownjs = require('../public/javascripts/click-drop');
    const districtDrop = dropdownjs.districtDrop;
    const incidentDrop = dropdownjs.incidentDrop;

    uli = document.getElementById("myUL");
    lii = uli.getElementsByTagName('li');

    uld = document.getElementById("myUL2");
    lid = uld.getElementsByTagName("li")

    //test to make sure when search is empty all elements are shown
    document.getElementById('myInput').value = "";
    incidentDrop();
    document.getElementById('myInput2').value = "";
    districtDrop();

    for (i = 0; i < lii.length; i++){
        expect(lii[i].style.display).toBe('');
    }

    for (i = 0; i < lid.length; i++){
        expect(lid[i].style.display).toBe('');
    }
    

    //test to make sure when search is not dependent on lower or upper case
    //incident type
    document.getElementById('myInput').value = "a";
    incidentDrop();

    var count = 0;
    for (i = 0; i < lii.length; i++){
        if(lii[i].style.display == "")
            count++;
    }

    document.getElementById('myInput').value = "A";
    incidentDrop();
    
    var count2 = 0;
    for (i = 0; i < lii.length; i++){
        if(lii[i].style.display == "")
            count2++;
    }

    expect(count).toEqual(count2);

    //district number
    document.getElementById('myInput2').value = "a";
    districtDrop();

    count = 0;
    for (i = 0; i < lid.length; i++){
        if(lid[i].style.display == "")
            count++;
    }

    document.getElementById('myInput2').value = "A";
    districtDrop();
    
    count2 = 0;
    for (i = 0; i < lid.length; i++){
        if(lid[i].style.display == "")
            count2++;
    }

    expect(count).toEqual(count2);


    //test to make sure when there is nothing matching, nothing is shown
    //incident type
    document.getElementById('myInput').value = "a2b3l3ksich3";
    incidentDrop();

    var count = 0;
    for (i = 0; i < lii.length; i++){
        if(lii[i].style.display == "")
            count++;
    }

    expect(count).toBe(0);

    //district number
    document.getElementById('myInput2').value = "a2b3l3ksich3";
    districtDrop();

    count = 0;
    for (i = 0; i < lid.length; i++){
        if(lid[i].style.display == "")
            count++;
    }

    expect(count).toBe(0);

    //test inputting certain values. Note: this test will have to be changed
    //every time either of the options are changed
    document.getElementById('myInput').value = "Alcohol Offenses";
    incidentDrop();

    var count = 0;
    for (i = 0; i < lii.length; i++){
        if(lii[i].style.display == "")
        
            count++;
    }

    expect(count).toBe(1);

    //district number
    document.getElementById('myInput2').value = "2";
    districtDrop();

    count = 0;
    for (i = 0; i < lid.length; i++){
        if(lid[i].style.display == ""){
            count++;
        }
    }

    expect(count).toBe(9);

});

