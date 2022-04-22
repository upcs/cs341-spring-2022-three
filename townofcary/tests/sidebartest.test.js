//Unit testing gile for sidebar.js
//Author: Connor Morgan

//test the sidebar
var fs = require('fs');

test('test hamburger button functionality', () => {
    //test to make sure the file exists
    var js = fs.readFileSync('public/javascripts/sidebar.js', 'utf-8');
    expect(js).toEqual(expect.anything());
    
    //test the functionality of the sidebar buttons
    var html = fs.readFileSync('public/index.html', 'utf-8');
    expect(html).toEqual(expect.anything());
    document.body.innerHTML = html;

    const sidebarjs = require('../public/javascripts/sidebar');
    const openNav = sidebarjs.openNav;
    const closeNav = sidebarjs.closeNav;

    var button1 = document.getElementById("one");
    var button2 = document.getElementById("two");
    var sb = document.getElementById("mySidebar");
    var m = document.getElementById("main");
    //make sure the buttons are initialized correctly
    expect(button1.style.display).toBe('');
    expect(button2.style.display).toBe('none');

    //make sure the sidebar and main are initialized correctly
    expect(sb.style.width).toBe('');
    expect(m.style.marginLeft).toBe('');

    //opening the sidebar when its closed
    openNav();
    expect(button1.style.display).toBe('none');
    expect(button2.style.display).toBe('');
    expect(sb.style.width).toBe('300px');
    expect(m.style.marginLeft).toBe('300px');


    //opening the sidebar when its open
    openNav();
    expect(button1.style.display).toBe('none');
    expect(button2.style.display).toBe('');
    expect(sb.style.width).toBe('300px');
    expect(m.style.marginLeft).toBe('300px');

    //closing the sidebar when its open
    closeNav();
    expect(button1.style.display).toBe('');
    expect(button2.style.display).toBe('none');
    expect(sb.style.width).toBe('0px');
    expect(m.style.marginLeft).toBe('0px');

    //closing the sidebar when its closed
    closeNav();
    expect(button1.style.display).toBe('');
    expect(button2.style.display).toBe('none');
    expect(sb.style.width).toBe('0px');
    expect(m.style.marginLeft).toBe('0px');

});

