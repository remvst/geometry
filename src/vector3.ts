export interface Vector3Like {
    x: number;
    y: number;
    z: number;
}

export class Vector3 implements Vector3Like {
    constructor(
        public x: number = 0,
        public y: number = 0,
        public z: number = 0,
    ) {}
}

export function copyVec3(vec3: Vector3Like): Vector3Like {
    return new Vector3(vec3.x, vec3.y, vec3.z);
}
