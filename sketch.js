class Circle {
    constructor(center, radius) {
        this.center = center;
        this.radius = radius;
    }
    move(point) {
        this.center = point;
    }
    draw(p) {
        p.ellipse(this.center.x, this.center.y, this.radius);
    }
}
class Triangle {
    constructor(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }
    draw(p) {
        p.triangle(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y);
    }
}
function isCirclePointCollision(c, p) {
    const cp = c.center.copy().sub(p);
    return cp.magSq() < (c.radius * c.radius);
}
function isCircleTriangleCollision(c, t) {
    // Check all three points for point collisions
    return [t.p1, t.p2, t.p3].some(p => isCirclePointCollision(c, p));
}
const sketch = (p) => {
    const width = p.windowWidth;
    const height = p.windowHeight;
    const circle = new Circle(p.createVector(p.mouseX, p.mouseY), 50);
    const point = p.createVector(width / 2, height / 2);
    const triangle = new Triangle(point.copy().add(0, 70), point.copy().add(-70, -70), point.copy().add(70, -70));
    p.preload = () => {
    };
    p.setup = () => {
        p.createCanvas(width, height);
    };
    p.windowResized = () => {
        p.resizeCanvas(width, height);
    };
    p.draw = () => {
        p.background('white');
        p.stroke('black');
        p.fill('white');
        const mousePosition = p.createVector(p.mouseX, p.mouseY);
        circle.move(mousePosition);
        circle.draw(p);
        if (isCircleTriangleCollision(circle, triangle)) {
            p.fill('red');
        }
        triangle.draw(p);
        p.fill('white');
    };
};
const p = new p5(sketch);
//# sourceMappingURL=sketch.js.map