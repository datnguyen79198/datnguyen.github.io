import * as THREE from 'three';

var LoadingScreen = {
    scene : new THREE.Scene(),
    camera : new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100),
    mesh : new THREE.Mesh(
        new THREE.BoxGeometry(0.5,0.5,0.5),
        new THREE.MeshBasicMaterial( {color : 0x2E63FF} )
    )
};

LoadingScreen.scene.background = new THREE.Color(0xFFB62E);
LoadingScreen.camera.position.set(0,5,5);
LoadingScreen.mesh.position.set(0,0,0);
LoadingScreen.camera.lookAt(LoadingScreen.mesh.position);
LoadingScreen.scene.add(LoadingScreen.mesh);

export {LoadingScreen};