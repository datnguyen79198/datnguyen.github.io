import * as THREE from 'three';

export class Entity extends THREE.Group {
    constructor (mesh,maxSpeed) {
        super();
        this.mesh = mesh;
        this.mass = 1;
        this.maxSpeed = maxSpeed;
        this.gravity = 0.01;
        this.boundingRadius = 0;
        this.velocity = new THREE.Vector3(0,0,0);
        this.vSamples = [];
        this.numSamples = 20;

        this.add(this.mesh); // add to group
    }

    standingOnGround() {
        if ((this.position.y < 0) && (this.velocity.y !== 0)) {
            this.position.setY(0);
            this.velocity.setY(0);
        }
    }

    lookWhereGoing() {
        //var direction = this.position.clone().add(this.velocity).setY(this.position.y);
        if (this.vSamples.length === this.numSamples) {
            this.vSamples.shift();
        }
        this.vSamples.push(this.velocity.clone().setY(this.position.Y));
        var direction = new THREE.Vector3(0, 0, 0);
        for (var v = 0; v < this.vSamples.length; v++) {
            direction.add(this.vSamples[v]);
        }
        direction.divideScalar(this.vSamples.length);
        direction = this.position.clone().add(direction).setY(this.position.y);
        //console.log(direction);
        this.lookAt(direction);
    }

    update() {
        this.standingOnGround();
        this.velocity.clampLength(0,this.maxSpeed);
        this.position.add(this.velocity);
    }
}
