
class Circle {
    center: p5.Vector;
    radius: number;

    constructor(center: p5.Vector, radius: number){
        this.center = center;
        this.radius = radius;
    }
    
    move(point: p5.Vector){
        this.center = point;
    }

    draw(p: p5){
        p.ellipse(this.center.x, this.center.y, this.radius);
    }

}

class Triangle {
    p1: p5.Vector;
    p2: p5.Vector;
    p3: p5.Vector;

    constructor(p1: p5.Vector, p2?: p5.Vector, p3?: p5.Vector){
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }

    draw(p: p5){
        p.triangle(
            this.p1.x, this.p1.y,
            this.p2.x, this.p2.y,
            this.p3.x, this.p3.y,
        );
    }
}

function isCirclePointCollision(c: Circle, p: p5.Vector): boolean {
    const cp = c.center.copy().sub(p);
    return cp.magSq() < (c.radius*c.radius);
}

function isCircleTriangleCollision(c: Circle, t: Triangle): boolean {
    // Check all three points for point collisions
    return [t.p1, t.p2, t.p3].some( p => isCirclePointCollision(c, p));
}

const sketch = (p:p5) => {
    const width = p.windowWidth;
    const height = p.windowHeight;

    const circle = new Circle(p.createVector(p.mouseX, p.mouseY), 50);

    const point = p.createVector(width/2, height/2);
    const triangle = new Triangle(
        point.copy().add(0, 70),
        point.copy().add(-70, -70),
        point.copy().add(70, -70)
    );

    p.preload = () => {

    }
    
    p.setup = () => {
        p.createCanvas(width, height);
    }
    
    p.windowResized = () => {
        p.resizeCanvas(width, height);
    }
    
    p.draw = () => {
        p.background('white');
        p.stroke('black');
        p.fill('white');

        const mousePosition = p.createVector(p.mouseX, p.mouseY);
        circle.move(mousePosition);
        circle.draw(p);

        if(isCircleTriangleCollision(circle, triangle)){
            p.fill('red');
        }
        triangle.draw(p);
        p.fill('white');
    }
}

const p = new p5(sketch);

