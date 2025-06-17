# @remvst/geometry

Basic common geometric helpers

## Installation

```sh
npm install @remvst/geometry
```

## Vector2

```typescript
import { Vector2 } from "@remvst/geometry";

const point1 = new Vector2();
const point2 = new Vector2(123, 456);
```

## Rectangle

```typescript
import { Rectangle } from "@remvst/geometry";

const rect = new Rectangle();
rect.centerAround(x, y, width, height).grow(10, 5);
```
