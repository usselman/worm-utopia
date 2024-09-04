class Worm {
    constructor(x, y) {
        this.head = createVector(x, y);
        this.body = [];
        this.numSegments = floor(random(3, 25));
        this.segmentLength = random(5, 50);
        this.radius = random(2, 10);
        this.randomFactor = random(0.1, 2);
        this.colorScheme = [random(255), random(255), random(255)];

        // Initialize body segments behind the head
        for (let i = 0; i < this.numSegments; i++) {
            let segment = this.head.copy().sub(i * this.segmentLength, 0);
            this.body.push(segment);
        }

        // Movement properties
        this.speed = random(1, 2);
        this.direction = p5.Vector.random2D();
        this.noiseOffset = random(10000); // To diversify noise paths for each worm
    }

    update(worms) {
        // Add erratic movement using Perlin noise
        let noiseAngle = noise(frameCount * 0.1 + this.noiseOffset) * TWO_PI * 2;
        this.direction.rotate(noiseAngle * 0.0025);
        this.head.add(this.direction.copy().mult(this.speed));

        // Ensure the head remains within canvas bounds
        this.head.x = constrain(this.head.x, 0, width);
        this.head.y = constrain(this.head.y, 0, height);

        // Prevent collision with other worms
        for (let other of worms) {
            if (other !== this && p5.Vector.dist(this.head, other.head) < (this.radius + other.radius) * 2) {
                // Simple collision response: repel heads
                let repel = p5.Vector.sub(this.head, other.head);
                repel.setMag(this.speed);
                this.head.add(repel);
            }
        }

        // Update the position of the head
        this.body[0] = this.head.copy();

        // Update the position of each segment with elastic effect
        for (let i = 1; i < this.body.length; i++) {
            let previousSegment = this.body[i - 1];
            let currentSegment = this.body[i];
            let direction = p5.Vector.sub(previousSegment, currentSegment);
            let distance = direction.mag();
            let springForce = (distance - this.segmentLength) * 0.5; // Elastic force coefficient

            // Apply spring-like elasticity
            direction.setMag(springForce);
            currentSegment.add(direction);

            // Smooth transition with maintainDistance function
            this.body[i] = maintainDistance(previousSegment, currentSegment, this.segmentLength);
        }
    }

    display() {
        // Draw the head
        noStroke();
        fill(0);
        rectMode(CENTER);
        rect(this.head.x, this.head.y, this.radius * 2);

        // Draw the body segments
        //noFill();
        //stroke(0);
        noStroke();
        stroke(this.colorScheme[0], this.colorScheme[1], this.colorScheme[2]);
        fill(this.colorScheme[0], this.colorScheme[1], this.colorScheme[2]);
        for (let i = 1; i < this.body.length; i++) {
            ellipse(this.body[i].x, this.body[i].y, this.radius * this.randomFactor);
            line(this.body[i].x, this.body[i].y, this.body[i - 1].x, this.body[i - 1].y);
        }
    }
}
