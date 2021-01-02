'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
function isBetween(a, b, c) {
    return a <= b && b <= c || a >= b && b >= c;
}
class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this._sides = [];
        for (let i = 0; i < 4; i++) {
            this._sides.push(new segment_1.default({ 'x': 0, 'y': 0 }, { 'x': 0, 'y': 0 }));
        }
        this._dirtySides = true;
        this.update(x, y, width, height);
    }
    get sides() {
        this.updateSidesIfNecessary();
        return this._sides;
    }
    get maxX() {
        return this.x + this.width;
    }
    get maxY() {
        return this.y + this.height;
    }
    centerAround(x, y, width = null, height = null) {
        this.update(x - this.width / 2, y - this.height / 2, width || this.width, height || this.height);
    }
    update(x, y, width, height) {
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
    intersects(otherRectangle) {
        return (isBetween(this.x, otherRectangle.x, this.maxX) ||
            isBetween(this.x, otherRectangle.maxX, this.maxX) ||
            isBetween(otherRectangle.x, this.x, otherRectangle.maxX) ||
            isBetween(otherRectangle.x, this.maxX, otherRectangle.maxX)) && (isBetween(this.y, otherRectangle.y, this.maxY) ||
            isBetween(this.y, otherRectangle.maxY, this.maxY) ||
            isBetween(otherRectangle.y, this.y, otherRectangle.maxY) ||
            isBetween(otherRectangle.y, this.maxY, otherRectangle.maxY));
    }
}
exports.default = Rectangle;
