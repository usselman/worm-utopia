let worms = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Create an initial set of worms
    for (let i = 0; i < 300; i++) {
        worms.push(new Worm(random(width), random(height)));
    }
}

function draw() {
    background(250);
    // Update and draw each worm
    for (let worm of worms) {
        worm.update(worms);
        worm.display();
    }
}
