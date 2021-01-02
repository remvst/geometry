import { Point } from './point';
import Rectangle from './rectangle';

function lineIntersectsLine(
    l1p1: Point,
    l1p2: Point,
    l2p1: Point,
    l2p2: Point
): boolean {
    let q = (l1p1.y - l2p1.y) * (l2p2.x - l2p1.x) - (l1p1.x - l2p1.x) * (l2p2.y - l2p1.y);
    const d = (l1p2.x - l1p1.x) * (l2p2.y - l2p1.y) - (l1p2.y - l1p1.y) * (l2p2.x - l2p1.x);

    if (d == 0) {
        return false;
    }

    const r = q / d;

    q = (l1p1.y - l2p1.y) * (l1p2.x - l1p1.x) - (l1p1.x - l2p1.x) * (l1p2.y - l1p1.y);
    const s = q / d;

    if( r < 0 || r > 1 || s < 0 || s > 1 ) {
        return false;
    }

    return true;
}

export default class Segment {

    readonly p1: Point;
    readonly p2: Point;

    constructor(p1: Point, p2: Point) {
        this.p1 = p1;
        this.p2 = p2;
    }

    angle(): number {
        return Math.atan2(this.p2.y - this.p1.y, this.p2.x - this.p1.x);
    }

    goesThroughRectangle(rectangle: Rectangle): boolean {
        for (let i = 0 ; i < rectangle.sides.length ; i++) {
            const side = rectangle.sides[i];
            if (this.intersects(side)) {
                return true;
            }
        }

        return false;
    }

    intersects(otherSegment: Segment) {
        return lineIntersectsLine(this.p1, this.p2, otherSegment.p1, otherSegment.p2);
    }

}
