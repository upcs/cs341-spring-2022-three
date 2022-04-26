//Unit testing file for everythign displaying table data
//Author: Connor Morgan

var fs = require('fs');

test('testing table updating properly', () => {
    var html = fs.readFileSync('public/index.html', 'utf8');
    expect(html).toEqual(expect.anything());
    document.body.innerHTML = html;

    var js = fs.readFileSync('public/javascripts/charts.js', 'utf-8');
    expect(js).toEqual(expect.anything());


    const tablejs = require('../public/javascripts/table-filter');
    
    var table = document.getElementById('mytable');
    expect(table).toEqual(expect.anything());
    
    //test adding data to the table
    tableData = [];
    tablejs.populateTable();
    expect(table.rows.length).toBe(0);
    
    var a = new Object({crime: "a", quantity: 130});
    tablejs.tableData.push(a);
    var b = new Object({crime: "b", quantity: 120});
    tablejs.tableData.push(b);
    tablejs.populateTable();
    expect(table.rows.length).toBe(2);

    //test sorting the table by crime
    var crimebutton = document.getElementById('crime');
    crimebutton.click();
    expect(table.rows[0].cells[0].innerHTML).toBe("b");
    crimebutton.click();
    expect(table.rows[0].cells[0].innerHTML).toBe("a");

    //test sorting the table by quantity
    var quantitybutton = document.getElementById('quantity');
    quantitybutton.click();
    expect(table.rows[0].cells[0].innerHTML).toBe("a");
    quantitybutton.click();
    expect(table.rows[0].cells[0].innerHTML).toBe("b");
    
});