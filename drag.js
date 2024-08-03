var is_mouse_down = false;
var mouse_down_start_x = 0;

document.getElementById("design-container").addEventListener("mousedown", function(event) {
    is_mouse_down = true;
    mouse_down_start_x = event.screenX;
});

document.addEventListener("mousemove", function(event) {
    if (is_mouse_down) {
        var translate_amt = event.screenX - mouse_down_start_x;
        var rotate_amt = translate_amt / 30;
        if (rotate_amt < -45) rotate_amt = -45;
        else if (rotate_amt > 45) rotate_amt = 45;
        document.getElementById("design-container").style.transform = "translateX(" + translate_amt + "px) rotate(" + rotate_amt + "deg)";
    }
});

document.addEventListener("mouseup", function(event) {
    document.getElementById("design-container").style.transform = "translateX(0)";
    is_mouse_down = false;
});