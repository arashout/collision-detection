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
function resetPen(p) {
    p.stroke('black');
    p.strokeWeight(1);
    p.fill('white');
}
function drawLine(p, v1, v2, color, isHeadToTail) {
    p.stroke(color);
    if (isHeadToTail) {
        p.line(v1.x, v1.y, v1.x + v2.x, v1.y + v2.y);
    }
    else {
        p.line(v1.x, v1.y, v2.x, v2.y);
    }
    resetPen(p);
}
function projection_b_onto_a(a, b, p) {
    const scalarProjection = a.copy().dot(b);
    return a.copy().mult(scalarProjection).div(a.magSq());
}
function isCirclePointCollision(c, p) {
    const cp = c.center.copy().sub(p);
    return cp.magSq() < (c.radius * c.radius);
}
function isCircleTriangleCollision(c, t, p) {
    // 1. Check all three triangle vertices for point collisions
    const vertexCollision = [t.p1, t.p2, t.p3].some(p => isCirclePointCollision(c, p));
    // if(vertexCollision){return true};
    // 2. Check triangle edges for collisions
    // const e1 = t.p1.copy().sub(t.p3);
    // const e2 = t.p2.copy().sub(t.p1);
    // const e3 = t.p3.copy().sub(t.p2);
    // const n1 = p.createVector(e1.y, -e1.x);
    // const c1 = c.center.copy().sub(t.p1);
    // const n2 = p.createVector(e2.y, -e2.x);
    // const c2 = c.center.copy().sub(t.p2);
    // const n3 = p.createVector(e3.y, -e3.x);
    // const c3 = c.center.copy().sub(t.p3);
    // const pj1 = projection_b_onto_a(n1, c1, p);
    // const pj2 = projection_b_onto_a(n2, c2, p);
    // const pj3 = projection_b_onto_a(n3, c3, p);
    // if(p){
    //     drawLine(p, c.center, pj1.copy().mult(-1), 'red', true);
    //     drawLine(p, c.center, pj2.copy().mult(-1), 'red', true);
    //     drawLine(p, c.center, pj3.copy().mult(-1), 'red', true);
    //     resetPen(p);
    // }
    return vertexCollision;
}
function isCircleInsideTriangle(c, t, p) {
    const e1 = t.p1.copy().sub(t.p3);
    const e2 = t.p2.copy().sub(t.p1);
    const e3 = t.p3.copy().sub(t.p2);
    const n1 = p.createVector(e1.y, -e1.x);
    const c1 = c.center.copy().sub(t.p1);
    const n2 = p.createVector(e2.y, -e2.x);
    const c2 = c.center.copy().sub(t.p2);
    const n3 = p.createVector(e3.y, -e3.x);
    const c3 = c.center.copy().sub(t.p3);
    return [n1.copy().dot(c1), n2.copy().dot(c2), n3.copy().dot(c3)].every(val => val < 0);
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
        triangle.draw(p);
        if (isCircleInsideTriangle(circle, triangle, p)) {
            p.fill('green');
        }
        const mousePosition = p.createVector(p.mouseX, p.mouseY);
        circle.move(mousePosition);
        circle.draw(p);
        p.fill('white');
    };
};
const p = new p5(sketch);
//# sourceMappingURL=sketch.js.map