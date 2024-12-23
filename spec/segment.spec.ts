import { Segment } from "../src/index";

describe("a segment", () => {
    it("can be initialized", () => {
        const segment = new Segment({ x: 1, y: 2 }, { x: 3, y: 4 });

        expect(segment.p1).toEqual({ x: 1, y: 2 });
        expect(segment.p2).toEqual({ x: 3, y: 4 });
    });

    it("cannot intersect if parallel (vertical)", () => {
        const s1 = new Segment({ x: 0, y: 2 }, { x: 0, y: 4 });
        const s2 = new Segment({ x: 1, y: 2 }, { x: 1, y: 4 });
        expect(s1.intersects(s2)).toBe(false);
    });

    it("cannot intersect if parallel (horizontal)", () => {
        const s1 = new Segment({ x: 2, y: 0 }, { x: 4, y: 0 });
        const s2 = new Segment({ x: 2, y: 1 }, { x: 4, y: 1 });
        expect(s1.intersects(s2)).toBe(false);
    });

    it("can intersect another (x shape)", () => {
        const s1 = new Segment({ x: 0, y: 0 }, { x: 1, y: 1 });
        const s2 = new Segment({ x: 0, y: 1 }, { x: 1, y: 0 });
        expect(s1.intersects(s2)).toBe(true);
    });

    it("can intersect another (+ shape)", () => {
        const s1 = new Segment({ x: 0.5, y: 0 }, { x: 0.5, y: 1 });
        const s2 = new Segment({ x: 0, y: 0.5 }, { x: 1, y: 0.5 });
        expect(s1.intersects(s2)).toBe(true);
    });
});
