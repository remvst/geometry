'use strict';

class Ray {

    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    angle() {
        return Math.atan2(this.p2.y - this.p1.y, this.p2.x - this.p1.x);
    }

    goesThroughRectangle(rectangle) {
        for (let i = 0 ; i < rectangle.sides.length ; i++) {
            const side = rectangle.sides[i];
            if (this.lineIntersectsLine(
                this.p1,
                this.p2,
                side.p1,
                side.p2
            )) {
                return true;
            }
        }

        return false;
    }

    lineIntersectsLine(l1p1, l1p2, l2p1, l2p2) {
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

}

module.exports = Ray;
