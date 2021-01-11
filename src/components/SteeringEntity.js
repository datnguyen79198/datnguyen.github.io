import * as THREE from 'three';

import { Entity } from './Entity.js';

export class SteeringEntity extends Entity {
    constructor(mesh,name,maxSpeed,wanderDistance,wanderAngle,wanderRadius,wanderRange) {
        super(mesh,maxSpeed);
        this.name = name;
        this.maxForce = 1;
        this.avoidDistance = 10;
        this.steeringForce = new THREE.Vector3(0,0,0);

        this.wanderDistance = wanderDistance;
        this.wanderAngle = wanderAngle;
        this.wanderRadius = wanderRadius;
        this.wanderRange = wanderRange;
    }

    bounce(box) {
        if (this.position.x > box.max.x) {
            this.position.setX(box.max.x);
            this.velocity.angle = this.velocity.angle + Math.PI;
        }

        if (this.position.x < box.min.x) {
            this.position.setX(box.min.x);
            this.velocity.angle = this.velocity.angle + Math.PI;
        }

        if (this.position.z > box.max.z) {
            this.position.setZ(box.max.z);
            this.velocity.angle = this.velocity.angle + Math.PI;
        }
        if (this.position.z < box.min.z) {
            this.position.setZ(box.min.z);
            this.velocity.angle = this.velocity.angle + Math.PI;
        }
    }

    turnAround(box) {
        if (this.position.x > box.max.x-1 
            || this.position.x < box.min.x+1 
            || this.position.z > box.max.z-1
            || this.position.z < box.min.z+1) {
            return this.wanderAngle +this.wanderRange;
        }

        return this.wanderAngle + (Math.random() - 0.5) * this.wanderRange;
    }

    wander(box) {
        var nextP = this.velocity.clone().normalize().setLength(this.wanderDistance);
        var offset = new THREE.Vector3(1,1,1);
        offset.setLength(this.wanderRadius);
        offset.x = Math.sin(this.wanderAngle) * offset.length();
        offset.y = Math.sin(this.wanderAngle) * offset.length();
        offset.z = Math.cos(this.wanderAngle) * offset.length();

        this.wanderAngle = this.turnAround(box);
        console.log(this.wanderAngle);
        nextP.add(offset);
        nextP.setY(0);
        this.steeringForce.add(nextP);
    }

    update() {
        this.steeringForce.clampLength(0,this.maxForce);
        this.steeringForce.divideScalar(this.mass);
        this.velocity.add(this.steeringForce);
        this.steeringForce.set(0,0,0);
        super.update();
    }
};
