import { Rectangle } from '../src/index';

describe('a rectangle', () => {
    it('can be updated', () => {
        const rectangle = new Rectangle(0, 0, 1, 1);
        rectangle.update(1, 2, 3, 4);

        expect(rectangle.x).toBe(1);
        expect(rectangle.y).toBe(2);
        expect(rectangle.width).toBe(3);
        expect(rectangle.height).toBe(4);

        expect(rectangle.x).toBe(rectangle.minX);
        expect(rectangle.y).toBe(rectangle.minY);
        expect(rectangle.maxX).toBe(rectangle.x + rectangle.width);
        expect(rectangle.maxY).toBe(rectangle.y + rectangle.height);
    });

    it('can be updated with a negative width', () => {
        const rectangle = new Rectangle(0, 0, 1, 1);
        rectangle.update(1, 2, -3, 4);

        expect(rectangle.x).toBe(-2);
        expect(rectangle.y).toBe(2);
        expect(rectangle.width).toBe(3);
        expect(rectangle.height).toBe(4);
    });

    it('can be updated with a negative height', () => {
        const rectangle = new Rectangle(0, 0, 1, 1);
        rectangle.update(1, 2, 3, -4);

        expect(rectangle.x).toBe(1);
        expect(rectangle.y).toBe(-2);
        expect(rectangle.width).toBe(3);
        expect(rectangle.height).toBe(4);
    });

    it('can be updated without a width and height', () => {
        const rectangle = new Rectangle(0, 0, 34, 56);
        rectangle.update(1, 2);

        expect(rectangle.x).toBe(1);
        expect(rectangle.y).toBe(2);
        expect(rectangle.width).toBe(34);
        expect(rectangle.height).toBe(56);
    });

    it('can be centered around a point', () => {
        const rectangle = new Rectangle(0, 0, 1, 1);

        rectangle.centerAround(20, 60, 10, 50);

        expect(rectangle.width).toBe(10);
        expect(rectangle.height).toBe(50);
        expect(rectangle.x).toBe(15);
        expect(rectangle.y).toBe(35);
    });

    it('can be centered around a point without a width and height', () => {
        const rectangle = new Rectangle(0, 0, 30, 20);

        rectangle.centerAround(100, 700);

        expect(rectangle.width).toBe(30);
        expect(rectangle.height).toBe(20);
        expect(rectangle.x).toBe(85);
        expect(rectangle.y).toBe(690);
    });

    it('can have its bounds set', () => {
        const rectangle = new Rectangle();

        rectangle.setBounds(10, 20, 35, 50);

        expect(rectangle.x).toBe(10);
        expect(rectangle.y).toBe(20);
        expect(rectangle.width).toBe(25);
        expect(rectangle.height).toBe(30);
    });

    it('can combine its bounds with another rectangle', () => {
        const rectangle = new Rectangle(10, 25, 50, 60);

        rectangle.combineBounds(new Rectangle(0, 0, 100, 200));

        expect(rectangle.x).toBe(0);
        expect(rectangle.y).toBe(0);
        expect(rectangle.width).toBe(100);
        expect(rectangle.height).toBe(200);
    });
});
