'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
function isBetween(a, b, c) {
    return a <= b && b <= c || a >= b && b >= c;
}
class Rectangle {
    constructor(x, y, width, height) {
        this._sides = [];
        this.dirtySides = true;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.update(x, y, width, height);
    }
    get sides() {
        this.updateSidesIfNecessary();
        return this._sides;
    }
    get minX() {
        return this.x;
    }
    get minY() {
        return this.y;
    }
    get maxX() {
        return this.x + this.width;
    }
    get maxY() {
        return this.y + this.height;
    }
    centerAround(x, y, width = this.width, height = this.height) {
        this.update(x - width / 2, y - height / 2, width, height);
    }
    update(x, y, width = this.width, height = this.height) {
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
    updateSidesIfNecessary() {
        if (!this.dirtySides) {
            return;
        }
        this.dirtySides = false;
        if (this._sides.length === 0) {
            for (let i = 0; i < 4; i++) {
                this._sides.push(new segment_1.default({ 'x': 0, 'y': 0 }, { 'x': 0, 'y': 0 }));
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
