import * as THREE from 'three';

var StartScreen = {
    scene : new THREE.Scene(),
    camera : new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100),
    mesh : new THREE.Mesh(
        new THREE.BoxGeometry(0.5,0.5,0.5),
        new THREE.MeshBasicMaterial( {color : 0xF9FF2E} )
    )
};

StartScreen.scene.background = new THREE.Color(0xFF472E);
StartScreen.camera.position.set(0,5,5);
StartScreen.mesh.position.set(0,0,0);
StartScreen.camera.lookAt(StartScreen.mesh.position);
StartScreen.scene.add(StartScreen.mesh);

export {StartScreen};