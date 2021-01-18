import * as THREE from 'three';

import { Entity } from '../components/Entity';

const TextLoader = (loader, textData, fontLink, Obstacles, worldScene) => {
    let textGeo;
    loader.load(fontLink, (font) => {
        textGeo = new THREE.TextGeometry(textData.text, {
            font : font,
            size: textData.size,
            height: textData.height,
            curveSegments: textData.curveSegments,
            bevelEnabled: textData.bevelEnabled,
            bevelThickness: textData.bevelThickness,
            bevelSize: textData.bevelSize,
            bevelSegments: textData.bevelSegments
        })

        let textMat = new THREE.MeshPhongMaterial({ color: 0xF0E1D1 });
        let textMesh = new THREE.Mesh(textGeo, textMat);
        var textEntity = new Entity(textMesh,0,1);
        textEntity.position.set(textData.position.x,textData.position.y,textData.position.z);
        if (textData.rotation) {
            textEntity.rotation.set(textData.rotation.x,textData.rotation.y,textData.rotation.z);
        }
        textEntity.castShadow = true;
        textEntity.receiveShadow = true;

        Obstacles.push(textEntity);
        worldScene.add(textEntity);
    });        
}

export {TextLoader};