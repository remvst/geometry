import Segment from './segment';
export default class Rectangle {
    private readonly _sides;
    private dirtySides;
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    get sides(): Segment[];
    get minX(): number;
    get minY(): number;
    get maxX(): number;
    get maxY(): number;
    centerAround(x: number, y: number, width?: number, height?: number): void;
    update(x: number, y: number, width?: number, height?: number): void;
    updateSidesIfNecessary(): void;
    intersects(otherRectangle: Rectangle): boolean;
}
