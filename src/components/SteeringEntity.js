import * as THREE from 'three';

import { Entity } from './Entity.js';

export class SteeringEntity extends Entity {
    constructor(mesh) {
        super(mesh);
        this.maxForce = 1;
        this.avoidDistance = 10;
        this.steeringForce = new THREE.Vector3(0,0,0);
    }
};
