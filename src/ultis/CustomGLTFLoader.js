import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { SteeringEntity } from '../components/SteeringEntity';
import { Entity } from '../components/Entity';
import { Character } from '../components/Character';

import { GLTFClone,SceneClone } from '../ultis/CloneMethods';

const CustomGLTFLoader = (passingObj) => {
    for (let i=0; i< passingObj.MODELS.length; i++) {
        const model = passingObj.MODELS[i];
        loadGLTFModel(model, passingObj);
    }
}

const loadGLTFModel = (model, passingObj) => {
    const loader = new GLTFLoader( passingObj.loadingManager );
    const url_model = model.url;

    loader.load(url_model, (gltf) => {

        gltf.scene.traverse((obj) => {
            if (obj.isMesh) {
                obj.castShadow = model.castShadow;
                obj.receiveShadow = model.receiveShadow;
            }
        })

        model.gltf = GLTFClone(gltf);

        if (model.name === 'truck') console.log(gltf.animations);

    })
}

const GetModelByName = (passingObj,unitName) => {
    for (let i=0; i<passingObj.MODELS.length; i++) {
        if (unitName.includes(passingObj.MODELS[i].name)) {
            return passingObj.MODELS[i];
        }
    }

    return null;
}

const InitiateUnits = (passingObj) => {
    for (let i=0; i<passingObj.UNITS.length; i++) {

        const unit = passingObj.UNITS[i];
        const model = GetModelByName(passingObj,unit.name);

        if (model) {
            var unitScene = SceneClone( model.gltf.scene );
            const modelAnimations = model.gltf.animations;
            //console.log(unitScene);
            var unitEntity;
            var type;
            if (unit.entity_type === 'Steering' || unit.entity_type === 'Main_character') {
                if (unit.entity_type === 'Steering') {
                    unitEntity = new SteeringEntity(unitScene,unit.name,unit.maxSpeed,
                                                    unit.wanderDistance,unit.wanderAngle,
                                                    unit.wanderRadius,unit.wanderRange,0);
                    type = 0;
                } else {
                    unitEntity = new Character(unitScene,unit.maxSpeed,unit.boundingRadius);
                    type = 1;
                }
            } 
            else if (unit.entity_type === 'Obstacle') {
                unitEntity = new Entity(unitScene,0,unit.boundingRadius);
                type = 2;
            } 
            else {
                unitEntity = unitScene;
                type = 3;
            }

            if (unit.position) {
                unitEntity.position.set(unit.position.x, unit.position.y, unit.position.z);
            }

            if (unit.scale) {
                unitEntity.scale.set(unit.scale, unit.scale, unit.scale);
            }

            if (unit.rotation) {
                unitEntity.rotation.set(unit.rotation.x, unit.rotation.y, unit.rotation.z)
            }

            if (unit.animation) {
                for (let i=0;i<unit.animation.length;i++) {
                    let animate = unit.animation[i];
                    const mixer = StartAnimation(unitEntity, modelAnimations, animate);
                    passingObj.mixers.push({
                        mixer : mixer,
                        name : unit.name
                    });
                }
            }
            if (type === 0) {
                passingObj.SteeringEntities.push(unitEntity);
            } 
            else if (type === 1) {
                passingObj.mainCharacteres.push(unitEntity);
            }
            else if (type === 2) {
                passingObj.Obstacles.push(unitEntity);
            }
            
            passingObj.worldScene.add(unitEntity);

        } else {
            console.error("not found model");
        }
    }
}

const StartAnimation = (mesh, animations, animationName) => {
    const mixer = new THREE.AnimationMixer(mesh);
    const clip = THREE.AnimationClip.findByName(animations, animationName);
    
    if (clip) {
        const action = mixer.clipAction(clip);
        action.play();
    }

    return mixer;
}

const RemoveMixers = (passingObj,unitName) => {
    var id = -1;
    for (let i = 0; i<passingObj.mixers.length; i++) 
        if (passingObj.mixers[i].name === unitName) {
            id = i;
        }
    console.log(unitName + " " + id);
    if (id !== -1) passingObj.mixers.splice(id,1);
}

const ChangeAnimation = (passingObj, unitEntity, animationName) => {
    console.log(passingObj.mixers);
    RemoveMixers(passingObj,unitEntity.name);
    if (animationName) {
        const model = GetModelByName(passingObj,unitEntity.name);
        if (model) {
            //console.log("fuck");
            const modelAnimations = model.gltf.animations;
            const mixer = StartAnimation(unitEntity, modelAnimations, animationName);
            passingObj.mixers.push({
                mixer : mixer,
                name : unitEntity.name
            });
        }
    }
    //console.log(passingObj.mixers);
}

export {CustomGLTFLoader , InitiateUnits, ChangeAnimation};