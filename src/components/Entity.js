import * as THREE from 'three';

export class Entity extends THREE.Group {
    constructor (mesh) {
        super();
        this.mesh = mesh;
        this.mass = 1;
        this.maxSpeed = 1.0;
        this.boundingRadius = 0;
        this.velocity = new THREE.Vector3(0,0,0);

        this.add(this.mesh); // add to group
    }
}
