import * as THREE from 'three';

import { Entity } from './Entity.js';

export class SteeringEntity extends Entity {
    constructor(mesh) {
        super(mesh);
        this.maxForce = 1;
        this.maxHigh = 0.3;
        this.avoidDistance = 10;
        this.steeringForce = new THREE.Vector3(0,0,0);
    }

    moveUp() {
        this.steeringForce.setZ(0);
        this.velocity.setZ(0);
        this.steeringForce.add(new THREE.Vector3(0,0,-this.maxSpeed/2));
    }
    moveDown() {
        this.steeringForce.setZ(0);
        this.velocity.setZ(0);
        this.steeringForce.add(new THREE.Vector3(0,0,this.maxSpeed/2));
    }
    moveRight() {
        this.steeringForce.setX(0);
        this.velocity.setX(0);
        this.steeringForce.add(new THREE.Vector3(this.maxSpeed/2,0,0));
        
    }
    moveLeft() {
        this.steeringForce.setX(0);
        this.velocity.setX(0);
        this.steeringForce.add(new THREE.Vector3(-this.maxSpeed/2,0,0));
    }
    jumpUp() {
        this.steeringForce.add(new THREE.Vector3(0,this.maxHigh/5,0));
    }
    unMoveUp() {
        this.steeringForce.setZ(0);
        this.velocity.setZ(0);
    }
    unMoveDown() {
        this.steeringForce.setZ(0);
        this.velocity.setZ(0);
    }
    unMoveRight() {
        this.steeringForce.setX(0);
        this.velocity.setX(0);
    }
    unMoveLeft() {
        this.steeringForce.setX(0);
        this.velocity.setX(0);
    }
    gravityPullDown() {
        if (this.position.y >= this.maxHigh) {
            this.steeringForce.sub(new THREE.Vector3(0,this.mass * this.gravity,0));
        }
    }

    update() {
        this.gravityPullDown();
        this.steeringForce.clampLength(0,this.maxForce);
        this.steeringForce.divideScalar(this.mass);
        this.velocity.add(this.steeringForce);
        this.steeringForce.set(0,0,0);
        super.update();
    }
};
