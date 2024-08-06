var design_container = document.getElementById("design-container");
var swipe_left = document.getElementById("swipe-left");
var swipe_right = document.getElementById("swipe-right");

var is_mouse_down = false;
var mouse_down_start_x = 0;

design_container.addEventListener("mousedown", function(event) {
    is_mouse_down = true;
    mouse_down_start_x = event.screenX;
});

document.addEventListener("mousemove", function(event) {
    if (is_mouse_down) {
        var translate_amt = event.screenX - mouse_down_start_x;
        var rotate_amt = translate_amt / 30;
        if (rotate_amt < -45) rotate_amt = -45;
        else if (rotate_amt > 45) rotate_amt = 45;
        design_container.style.transform = "translateX(" + translate_amt + "px) rotate(" + rotate_amt + "deg)";
    }
});

document.addEventListener("mouseup", function(event) {

    var design_bound = design_container.getBoundingClientRect();
    var left_bound = swipe_left.getBoundingClientRect();
    var right_bound = swipe_right.getBoundingClientRect();

    var w = design_container.offsetWidth;
    var h = design_container.offsetHeight;
    var W = design_bound.right - design_bound.left;
    var H = design_bound.bottom - design_bound.top;

    var left_mid_offset = (h * (W * h - H * w) / (2 * (h * h - w * w)));

    var design_left_midpoint = left_mid_offset + design_bound.left;
    var design_right_midpoint = design_bound.right - left_mid_offset;

    // User swiped left.
    if (design_left_midpoint <= left_bound.right) {
        design_container.style.backgroundColor = "mediumseagreen";
    }

    // User swiped right.
    if (design_right_midpoint >= right_bound.left) {
        design_container.style.backgroundColor = "lightcoral";
    }

    design_container.style.transform = "translateX(0)";
    is_mouse_down = false;
});