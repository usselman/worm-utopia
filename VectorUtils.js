function maintainDistance(pointA, pointB, targetDist) {
    let direction = p5.Vector.sub(pointA, pointB);
    let currentDist = direction.mag();

    // Adjust position if not at the target distance with slight spring effect
    let correction = currentDist - targetDist;
    if (Math.abs(correction) > 0.1) { // Adds stability by ignoring tiny corrections
        direction.setMag(correction * 0.1); // Elastic correction factor
        return p5.Vector.add(pointB, direction);
    }
    return pointB;
}
