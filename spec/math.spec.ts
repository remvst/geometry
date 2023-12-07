'use strict';

import { Vector2, between, distance, isBetween } from '../src/index';

describe('math', () => {
    describe('between', () => {
        it('will work as expected', () => {
            expect(between(0, 1, 2)).toBe(1);
            expect(between(0, -1, 2)).toBe(0);
            expect(between(0, 3, 2)).toBe(2);
        });
    });

    describe('isBetween', () => {
        it('will work as expected', () => {
            expect(isBetween(0, 1, 2)).toBe(true);
            expect(isBetween(0, 0, 2)).toBe(true);
            expect(isBetween(0, 2, 2)).toBe(true);

            expect(isBetween(0, -1, 2)).toBe(false);
            expect(isBetween(0, 3, 2)).toBe(false);
        });
    });

    describe('distance', () => {
        it('will work as expected', () => {
            expect(distance(new Vector2(0, 0), new Vector2(0, 0))).toBe(0);
            expect(distance(new Vector2(0, 0), new Vector2(100, 0))).toBe(100);
            expect(distance(new Vector2(0, 0), new Vector2(0, 100))).toBe(100);
            expect(distance(new Vector2(0, 0), new Vector2(100, 100))).toEqual(Math.hypot(100, 100));
        });
    });
});
