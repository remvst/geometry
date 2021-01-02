import { Point } from './point';
import Rectangle from './rectangle';
export default class Segment {
    readonly p1: Point;
    readonly p2: Point;
    constructor(p1: Point, p2: Point);
    angle(): number;
    goesThroughRectangle(rectangle: Rectangle): boolean;
    intersects(otherSegment: Segment): boolean;
}
