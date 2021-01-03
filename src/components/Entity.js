import * as THREE from 'three';

export class Entity extends THREE.Group {
    constructor (mesh) {
        super();
        this.mesh = mesh;
        this.mass = 1;
        this.maxSpeed = 0.04;
        this.gravity = 0.01;
        this.boundingRadius = 0;
        this.velocity = new THREE.Vector3(0,0,0);

        this.add(this.mesh); // add to group
    }

    standingOnGround() {
        if ((this.position.y < 0) && (this.velocity.y !== 0)) {
            this.position.setY(0);
            this.velocity.setY(0);
        }
    }

    update() {
        this.standingOnGround();
        this.velocity.clampLength(0,this.maxSpeed);
        console.log(this.velocity);
        this.position.add(this.velocity);
    }
}
