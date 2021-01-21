import * as THREE from 'three';

import { TEXTS_START } from '../configures/texts';
import { TextLoader } from '../ultis/TextLoader';

var loader;
var groundMesh;
var passingObj = {
    scene : null,
    objects : null
}

var mouse = new THREE.Vector2();
var raycaster;

var StartScreen = {
    scene : new THREE.Scene(),
    camera : new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100),
    loadingManager : new THREE.LoadingManager(),
    intersect : null,
    raycasterObjects : [],
    invisibleObj : [],
};

const InitLoading = () => {
    loader = new THREE.FontLoader( StartScreen.loadingManager );

    raycaster = new THREE.Raycaster();
}

const InitScene = () => {
    StartScreen.scene.background = new THREE.Color(0xDDFFFD);

    const HemisphereLight = new THREE.HemisphereLight( 0xFFF6DD, 0x05050C, 1.1 );
    StartScreen.scene.add(HemisphereLight);

    const sunLight = new THREE.DirectionalLight(0xFEE8C9, 1);
    sunLight.position.set(-7,10,-7);
    sunLight.target.position.set(0,0,0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 4096;
    sunLight.shadow.mapSize.height = 4096;
    sunLight.shadow.camera.top = 20;
	sunLight.shadow.camera.bottom = - 20;
	sunLight.shadow.camera.left = - 20;
	sunLight.shadow.camera.right = 20;
	sunLight.shadow.camera.near = 0.1;
	sunLight.shadow.camera.far = 100;
    StartScreen.scene.add(sunLight);

    //Oxyz
    const lineMatX = new THREE.LineBasicMaterial({color: 0xFF0000}); //red
    const lineMatY = new THREE.LineBasicMaterial({color: 0xABFF00}); //green
    const lineMatZ = new THREE.LineBasicMaterial({color: 0x0016FF}); //blue
    const pointO = new THREE.Vector3(0,0,0);

    const pointsX = [];
    pointsX.push(pointO);
    pointsX.push(new THREE.Vector3(10,0,0));
    const lineGeoX = new THREE.BufferGeometry().setFromPoints(pointsX);

    const pointsY = [];
    pointsY.push(pointO);
    pointsY.push(new THREE.Vector3(0,10,0));
    const lineGeoY = new THREE.BufferGeometry().setFromPoints(pointsY);

    const pointsZ = [];
    pointsZ.push(pointO);
    pointsZ.push(new THREE.Vector3(0,0,10));
    const lineGeoZ = new THREE.BufferGeometry().setFromPoints(pointsZ); 

    const Ox = new THREE.Line(lineGeoX, lineMatX);
    const Oy = new THREE.Line(lineGeoY, lineMatY);
    const Oz = new THREE.Line(lineGeoZ, lineMatZ);
    StartScreen.scene.add(Ox);
    StartScreen.scene.add(Oy);
    StartScreen.scene.add(Oz);
    StartScreen.scene.add(StartScreen.mesh);

    //ground 
    const groundGeo = new THREE.PlaneBufferGeometry(20,20);
    const groundMat = new THREE.MeshPhongMaterial({ color: 0x6D3E05});
    groundMesh = new THREE.Mesh(groundGeo,groundMat);
    groundMesh.rotation.x = -Math.PI/2;
    groundMesh.position.z += 4;
    groundMesh.receiveShadow = true;
    StartScreen.scene.add(groundMesh);
    //raycasterObjects.push(groundMesh);

    passingObj = {
        scene : StartScreen.scene,
        objects : StartScreen.raycasterObjects
    }

    TextLoader(loader, TEXTS_START[0], './fonts/Vehicle_Breaks_Down_Regular.json', 0x645F58, passingObj);

    passingObj = {
        scene : StartScreen.scene,
        objects : StartScreen.invisibleObj
    }

    TextLoader(loader, TEXTS_START[1], './fonts/Vehicle_Breaks_Down_Regular.json', 0x645F58, passingObj);

    StartScreen.camera.position.set(0,2,1.5);
    StartScreen.camera.lookAt(StartScreen.scene.position);
}

const onDocumentMouseMove = (event) => {
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1; 
    
    raycaster.setFromCamera(mouse, StartScreen.camera);

    const intersects = raycaster.intersectObjects( StartScreen.raycasterObjects,true );
    if (intersects.length > 0) StartScreen.intersect = intersects[0];
    else StartScreen.intersect = null;
    
}

InitLoading();
InitScene();
window.addEventListener('mousemove',onDocumentMouseMove, false);

export {StartScreen};