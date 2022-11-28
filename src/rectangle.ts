import { Point } from './point';
import Segment from './segment';

function isBetween(
    a: number,
    b: number,
    c: number
): boolean {
    return a <= b && b <= c || a >= b && b >= c;
}

export default class Rectangle {

    private readonly _sides: Segment[] = [];
    private dirtySides: boolean = true;

    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0;

    constructor(
        x: number = 0,
        y: number = 0,
        width: number = 0,
        height: number = 0,
    ) {
        this.update(x, y, width, height);
    }

    get sides(): Segment[] {
        this.updateSidesIfNecessary();
        return this._sides;
    }

    get minX(): number {
        return this.x;
    }

    get minY(): number {
        return this.y;
    }

    get maxX(): number {
        return this.x + this.width;
    }

    get maxY(): number {
        return this.y + this.height;
    }

    get midX(): number {
        return this.x + this.width / 2;
    }

    get midY(): number {
        return this.y + this.height / 2;
    }

    centerAround(
        x: number,
        y: number,
        width: number = this.width,
        height: number = this.height
    ) {
        this.update(
            x - width / 2,
            y - height / 2,
            width,
            height
        );
    }

    update(
        x: number,
        y: number,
        width: number = this.width,
        height: number = this.height
    ) {
        if (width < 0) {
            x += width;
            width *= -1;
        }
        if (height < 0) {
            y += height;
            height *= -1;
        }

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dirtySides = true;
    }

    setBounds(minX: number, minY: number, maxX: number, maxY: number) {
        this.update(minX, minY, maxX - minX, maxY - minY);
    }

    combineBounds(other: Rectangle) {
        this.setBounds(
            Math.min(this.minX, other.minX),
            Math.min(this.minY, other.minY),
            Math.max(this.maxX, other.maxX),
            Math.max(this.maxY, other.maxY),
        );
    }

    updateSidesIfNecessary() {
        if (!this.dirtySides) {
            return;
        }

        this.dirtySides = false;

        if (this._sides.length === 0) {
            for (let i = 0 ; i < 4 ; i++) {
                this._sides.push(new Segment(
                    {'x': 0, 'y': 0},
                    {'x': 0, 'y': 0}
                ));
            }
        }

        this._sides[0].p1.x = this.x;
        this._sides[0].p1.y = this.y;
        this._sides[0].p2.x = this.x + this.width;
        this._sides[0].p2.y = this.y;

        this._sides[1].p1.x = this.x;
        this._sides[1].p1.y = this.y;
        this._sides[1].p2.x = this.x;
        this._sides[1].p2.y = this.y + this.height;

        this._sides[2].p1.x = this.x + this.width;
        this._sides[2].p1.y = this.y;
        this._sides[2].p2.x = this.x + this.width;
        this._sides[2].p2.y = this.y + this.height;

        this._sides[3].p1.x = this.x;
        this._sides[3].p1.y = this.y + this.height;
        this._sides[3].p2.x = this.x + this.width;
        this._sides[3].p2.y = this.y + this.height;
    }

    intersects(otherRectangle: Rectangle) {
        return (
            isBetween(this.x, otherRectangle.x, this.maxX) ||
            isBetween(this.x, otherRectangle.maxX, this.maxX) ||
            isBetween(otherRectangle.x, this.x, otherRectangle.maxX) ||
            isBetween(otherRectangle.x, this.maxX, otherRectangle.maxX)
        ) && (
            isBetween(this.y, otherRectangle.y, this.maxY) ||
            isBetween(this.y, otherRectangle.maxY, this.maxY) ||
            isBetween(otherRectangle.y, this.y, otherRectangle.maxY) ||
            isBetween(otherRectangle.y, this.maxY, otherRectangle.maxY)
        );
    }

    containsPoint(point: Point) {
        return isBetween(this.x, point.x, this.maxX) && isBetween(this.y, point.y, this.maxY);
    }
}
