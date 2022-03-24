const {openNav} = require("../public/javascripts/sidebar");


test("open the sidebar", () => {
    render(openNav);

    const element = document.getElementById("one");
    const styles = getComputedStyle(element);

    expect(styles.display).toBe('none');
});

