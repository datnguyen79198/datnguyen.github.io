import * as THREE from 'three';

import { Entity } from './Entity.js';

export class SteeringEntity extends Entity {
    constructor(mesh,name,maxSpeed,wanderDistance,wanderAngle,wanderRadius,wanderRange,boundingRadius) {
        super(mesh,maxSpeed,boundingRadius);
        this.name = name;
        this.maxForce = 1;
        this.avoidDistance = 0.5;
        this.steeringForce = new THREE.Vector3(0,0,0);
        this.locationIndex = 0;

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
                let chance = (Math.random() - 0.5 > 0) ? 1 : -1;
                return this.wanderAngle + chance * this.wanderRange;
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
        nextP.add(offset);
        nextP.setY(0);
        this.steeringForce.add(nextP);
    }

    avoid(obstacles) {
        var mostThreaten = null;
        var ahead = this.position.clone().add(this.velocity.clone().normalize().multiplyScalar(this.avoidDistance));
        for (let i = 0; i<obstacles.length;i++) {
            let obs = obstacles[i];
            if (obs===null) continue;
            var collision = (obs.position.distanceTo(ahead) <= obs.boundingRadius);

            if (collision && (mostThreaten===null || this.position.distanceTo(obs) < this.position.distanceTo(mostThreaten.position))) {
                mostThreaten = obs;
            }
        }
        var avoidance = new THREE.Vector3(0, 0, 0)
        if (mostThreaten != null) {
            avoidance = ahead.clone().sub(mostThreaten.position).normalize().multiplyScalar(1);
        }
        this.steeringForce.add(avoidance);
    }

    flee(position) {
        var desiredVelocity = position.clone().sub(this.position);
        desiredVelocity.normalize().setLength(this.maxSpeed).sub(this.velocity);
        this.steeringForce.sub(desiredVelocity);
    }

    evade(target) {
        var lookAheadTime = this.position.distanceTo(target.position) / this.maxSpeed;
        var predictedTarget = target.position.clone().sub(target.velocity.clone().setLength(lookAheadTime));
        this.flee(predictedTarget);
    }

    seek(position) {
        var desiredVelocity = position.clone().sub(this.position);
        desiredVelocity.normalize().setLength(this.maxSpeed).sub(this.velocity);
        this.steeringForce.add(desiredVelocity);
    }

    followPath(path, thresholdRadius = 0.5) {
        var wayPoint = path[this.locationIndex]
        if (wayPoint == null) return;
        if (this.position.distanceTo(wayPoint) < thresholdRadius && this.locationIndex+1 < path.length ) {
            this.locationIndex++;
        }
        this.seek(wayPoint);
    }

    update() {
        this.steeringForce.clampLength(0,this.maxForce);
        this.steeringForce.divideScalar(this.mass);
        this.velocity.add(this.steeringForce);
        this.steeringForce.set(0,0,0);
        super.update();
    }
};
