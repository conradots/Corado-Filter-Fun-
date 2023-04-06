//Get input from text input
var imgcanvas = document.getElementById("can");
var fileinput = document.getElementById("finput");

var originalimage = null;
var rainbowimage = null;
var grayimage = null;
var blurredimage = null;
var redimage = null;

// Upload
function upload() {
    // Draw the input image to the canvas
    originalimage = new SimpleImage(fileinput);
    originalimage.drawTo(imgcanvas);
    document.getElementById("fsize").value = imgcanvas.width + " x " + imgcanvas.height;

    // Set the other 4 copies to be the same as the origional one
    rainbowimage = new SimpleImage(fileinput);
    // rainbowimage.drawTo(imgcanvas);
    grayimage = new SimpleImage(fileinput);
    // grayimage.drawTo(imgcanvas);
    blurredimage = new SimpleImage(fileinput);
    // blurredimage.drawTo(imgcanvas);
    redimage = new SimpleImage(fileinput);
    // redimage.drawTo(imgcanvas);
}

function imageIsLoaded(image) {
    if (image == null || !image.complete()) {
        return false;
    } else {
        return true;
    }
}

// Rainbow filter
function makeRainbow() {
    var height = rainbowimage.getHeight();
    var stripeheight = height / 7;

    for (var pixel of rainbowimage.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;

        if (pixel.getY() < stripeheight * 1) {
            // Set to Red
            if (avg < 128) {
                pixel.setRed(2 * avg);
                pixel.setGreen(0);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(2 * avg - 255);
                pixel.setBlue(2 * avg - 255);
            }
        } else if ((pixel.getY() >= stripeheight * 1) && (pixel.getY() < stripeheight * 2)) {
            // Set to Orange
            if (avg < 128) {
                pixel.setRed(2 * avg);
                pixel.setGreen(0.8 * avg);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(1.2 * avg - 51);
                pixel.setBlue(2 * avg - 255);
            }
        } else if ((pixel.getY() >= stripeheight * 2) && (pixel.getY() < stripeheight * 3)) {
            // Set to Yellow
            if (avg < 128) {
                pixel.setRed(2 * avg);
                pixel.setGreen(2 * avg);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(255);
                pixel.setBlue(2 * avg - 255);
            }
        } else if ((pixel.getY() >= stripeheight * 3) && (pixel.getY() < stripeheight * 4)) {
            // Set to Green
            if (avg < 128) {
                pixel.setRed(0);
                pixel.setGreen(2 * avg);
                pixel.setBlue(0);
            } else {
                pixel.setRed(2 * avg - 255);
                pixel.setGreen(255);
                pixel.setBlue(2 * avg - 255);
            }
        } else if ((pixel.getY() >= stripeheight * 4) && (pixel.getY() < stripeheight * 5)) {
            // Set to Blue
            if (avg < 128) {
                pixel.setRed(0);
                pixel.setGreen(0);
                pixel.setBlue(2 * avg);
            } else {
                pixel.setRed(2 * avg - 255);
                pixel.setGreen(2 * avg - 255);
                pixel.setBlue(255);
            }
        } else if ((pixel.getY() >= stripeheight * 5) && (pixel.getY() < stripeheight * 6)) {
            // Set to Indigo
            if (avg < 128) {
                pixel.setRed(0.8 * avg);
                pixel.setGreen(0);
                pixel.setBlue(2 * avg);
            } else {
                pixel.setRed(1.2 * avg - 51);
                pixel.setGreen(2 * avg - 255);
                pixel.setBlue(255);
            }
        } else {
            // Set to Violet
            if (avg < 128) {
                pixel.setRed(1.6 * avg);
                pixel.setGreen(0);
                pixel.setBlue(1.6 * avg);
            } else {
                pixel.setRed(0.4 * avg + 153);
                pixel.setGreen(2 * avg - 255);
                pixel.setBlue(0.4 * avg + 153);
            }
        }
    }
}

function doRainbow() {
    // Check that the copy of the image for this filter has loaded before you apply the filter to it
    if (imageIsLoaded(rainbowimage)) {
        makeRainbow();
        rainbowimage.drawTo(imgcanvas);
    }
}

// Grayscale filter
function makeGray() {
    for (var pixel of grayimage.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }
}

function doGray() {
    // Check that the copy of the image for this filter has loaded before you apply the filter to it
    if (imageIsLoaded(grayimage)) {
        makeGray();
        grayimage.drawTo(imgcanvas);
    }
}

// Blur filter
function makeBlur() {
    var blankimage = new SimpleImage(blurredimage.getWidth(), blurredimage.getHeight());

    for (pixel of blankimage.values()) {
        var rand = Math.random();
        var near = Math.floor(Math.random() * 11);

        var x = pixel.getX();
        var y = pixel.getY();

        var newx = Math.min(x + near, blurredimage.getWidth() - 1);
        var newy = Math.min(y + near, blurredimage.getHeight() - 1);

        var blurredpixel = null;

        if (rand < 0.5) {
            blurredpixel = blurredimage.getPixel(x, y);
        } else {
            blurredpixel = blurredimage.getPixel(newx, newy);
        }

        blankimage.setPixel(x, y, blurredpixel);
    }

    blurredimage = blankimage;
}

function doBlur() {
    // Check that the copy of the image for this filter has loaded before you apply the filter to it
    if (imageIsLoaded(blurredimage)) {
        makeBlur();
        blurredimage.drawTo(imgcanvas);
    }
}

// Red filter
function makeRed() {
    for (var pixel of redimage.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if (avg < 128) {
            pixel.setRed(2 * avg);
            pixel.setGreen(0);
            pixel.setBlue(0);
        } else {
            pixel.setRed(255);
            pixel.setGreen(2 * avg - 255);
            pixel.setBlue(2 * avg - 255);
        }
    }
}

function doRed() {
    // Check that the copy of the image for this filter has loaded before you apply the filter to it
    if (imageIsLoaded(redimage)) {
        makeRed();
        redimage.drawTo(imgcanvas);
    }
}

// Reset Image
function resetImage() {
    // Check if the original image is loaded
    if (imageIsLoaded(originalimage)) {
        // Display the original image
        originalimage.drawTo(imgcanvas);

        // Reset all of the global variables for filter images to the original image
        rainbowimage = new SimpleImage(fileinput);
        // rainbowimage.drawTo(imgcanvas);
        grayimage = new SimpleImage(fileinput);
        // grayimage.drawTo(imgcanvas);
        blurredimage = new SimpleImage(fileinput);
        // blurredimage.drawTo(imgcanvas);
        redimage = new SimpleImage(fileinput);
        // redimage.drawTo(imgcanvas);
    }
}