import { isBetween } from "./math";
import { Segment } from "./segment";
import { Vector2, Vector2Like } from "./vector2";

export class Rectangle {
    private readonly _sides: Segment[] = [];
    private dirtySides: boolean = true;

    constructor(
        public x: number = 0,
        public y: number = 0,
        public width: number = 0,
        public height: number = 0,
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
        height: number = this.height,
    ): this {
        return this.update(x - width / 2, y - height / 2, width, height);
    }

    update(
        x: number,
        y: number,
        width: number = this.width,
        height: number = this.height,
    ): this {
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

        return this;
    }

    setBounds(minX: number, minY: number, maxX: number, maxY: number): this {
        return this.update(minX, minY, maxX - minX, maxY - minY);
    }

    combineBounds(other: Rectangle): this {
        return this.setBounds(
            Math.min(this.minX, other.minX),
            Math.min(this.minY, other.minY),
            Math.max(this.maxX, other.maxX),
            Math.max(this.maxY, other.maxY),
        );
    }

    private updateSidesIfNecessary() {
        if (!this.dirtySides) {
            return;
        }

        this.dirtySides = false;

        if (this._sides.length === 0) {
            for (let i = 0; i < 4; i++) {
                this._sides.push(new Segment(new Vector2(), new Vector2()));
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

    intersects(otherRectangle: Rectangle): boolean {
        return (
            (isBetween(this.x, otherRectangle.x, this.maxX) ||
                isBetween(this.x, otherRectangle.maxX, this.maxX) ||
                isBetween(otherRectangle.x, this.x, otherRectangle.maxX) ||
                isBetween(otherRectangle.x, this.maxX, otherRectangle.maxX)) &&
            (isBetween(this.y, otherRectangle.y, this.maxY) ||
                isBetween(this.y, otherRectangle.maxY, this.maxY) ||
                isBetween(otherRectangle.y, this.y, otherRectangle.maxY) ||
                isBetween(otherRectangle.y, this.maxY, otherRectangle.maxY))
        );
    }

    containsPoint(point: Vector2Like): boolean {
        return (
            isBetween(this.x, point.x, this.maxX) &&
            isBetween(this.y, point.y, this.maxY)
        );
    }

    clone(): Rectangle {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }

    copy(other: Rectangle): this {
        return this.update(other.x, other.y, other.width, other.height);
    }

    pad(paddingX: number, paddingY: number): this {
        this.update(
            this.x - paddingX,
            this.y - paddingY,
            this.width + paddingX * 2,
            this.height + paddingY * 2,
        );
        return this;
    }

    grow(x: number, y: number): this {
        return this.pad(x, y);
    }

    shrink(x: number, y: number): this {
        return this.pad(-x, -y);
    }
}
