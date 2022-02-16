import Segment from './segment';
export default class Rectangle {
    private _sides;
    private _dirtySides;
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    get sides(): Segment[];
    get maxX(): number;
    get maxY(): number;
    centerAround(x: number, y: number, width?: number, height?: number): void;
    update(x: number, y: number, width?: number, height?: number): void;
    updateSidesIfNecessary(): void;
    intersects(otherRectangle: Rectangle): boolean;
}
