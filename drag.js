/*** IMAGE DATABASE START ***/

var images = ["test-img/test-design-1.jpg", "test-img/test-design-2.jpg", "test-img/test-design-3.jpg", "test-img/test-design-4.jpg"];
var index = 0;

/*** IMAGE DATABASE END ***/

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

    is_mouse_down = false;

    // User finished voting.
    if (index >= images.length) {
        design_container.classList.add("return-to-mid");
        setTimeout(function () {
            design_container.style.transform = "translateX(0px)";
            design_container.classList.remove("return-to-mid");
        }, 500);

        return;
    }

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
        console.log(1);
        image_transition_animation("left");
    }

    // User swiped right.
    else if (design_right_midpoint >= right_bound.left) {
        console.log(0);
        image_transition_animation("right");
    }

    // User stayed in the middle.
    else {
        design_container.classList.add("return-to-mid");
        setTimeout(function () {
            design_container.style.transform = "translateX(0px)";
            design_container.classList.remove("return-to-mid");
        }, 500);
    }

});

function image_transition_animation(fade_out_direction) {
    design_container.classList.add("fade-out-" + fade_out_direction);
        setTimeout(function () {
            design_container.style.opacity = "0";
            design_container.style.transform = "scale(0)";
            design_container.classList.remove("fade-out-" + fade_out_direction);

            // Switch to next image.
            index++;
            if (index < images.length) {
                design_container.innerHTML = html_img(images[index]);
            }
            else {
                design_container.innerHTML = "That's all! Thanks for voting!";
                design_container.style.textAlign = "center";
            }

            design_container.classList.add("fade-in");
            setTimeout(function () {
                design_container.style.opacity = "1";
                design_container.style.transform = "translateX(0px)";
                design_container.classList.remove("fade-in");
            }, 500);
        }, 500);
}

function html_img(src) {
    return "<img draggable='false' src='" + src + "'>";
}