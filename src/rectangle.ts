'use strict';

import Segment from './segment';

function isBetween(
    a: number,
    b: number,
    c: number
): boolean {
    return a <= b && b <= c || a >= b && b >= c;
}

export default class Rectangle {

    private _sides: Segment[];
    private _dirtySides: boolean;

    x: number;
    y: number;
    width: number;
    height: number;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this._sides = [];
        for (let i = 0 ; i < 4 ; i++) {
            this._sides.push(new Segment(
                {'x': 0, 'y': 0},
                {'x': 0, 'y': 0}
            ));
        }

        this._dirtySides = true;

        this.update(x, y, width, height);
    }

    get sides(): Segment[] {
        this.updateSidesIfNecessary();
        return this._sides;
    }

    get maxX(): number {
        return this.x + this.width;
    }

    get maxY(): number {
        return this.y + this.height;
    }

    centerAround(
        x: number,
        y: number,
        width: number | null = null,
        height: number | null = null
    ) {
        this.update(
            x - this.width / 2,
            y - this.height / 2,
            width || this.width,
            height || this.height
        );
    }

    update(
        x: number,
        y: number,
        width: number,
        height: number
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this._dirtySides = true;
    }

    updateSidesIfNecessary() {
        if (!this._dirtySides) {
            return;
        }

        this._dirtySides = true;

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

}
