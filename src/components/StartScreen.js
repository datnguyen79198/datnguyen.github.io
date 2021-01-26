import * as THREE from 'three';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { Line2 } from 'three/examples/jsm/lines/Line2';

import { TEXTS_START } from '../configures/texts';
import {LOADING_MODELS} from '../configures/loading_models';
import {LOADING_UNITS} from '../configures/loading_units';

import { TextLoader } from '../ultis/TextLoader';
import { CustomGLTFLoader } from '../ultis/CustomGLTFLoader';

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
    Obstacles : [], 
    SteeringEntities : [], 
    mainCharacteres : [],
    mixers : []
};

const InitLoading = () => {
    loader = new THREE.FontLoader( StartScreen.loadingManager );

    raycaster = new THREE.Raycaster();
}

const InitScene = () => {
    StartScreen.scene.background = new THREE.Color(0xDDFFFD);

    const HemisphereLight = new THREE.HemisphereLight( 0xFFF6DD, 0x05050C, 1.1 );
    StartScreen.scene.add(HemisphereLight);

    const sunLight = new THREE.DirectionalLight(0xFEE8C9, 0.5);
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

    //ground 
    
    const groundGeo = new THREE.PlaneBufferGeometry(20,20);
    const groundMat = new THREE.MeshPhongMaterial({ color: 0x6D3E05});
    groundMesh = new THREE.Mesh(groundGeo,groundMat);
    groundMesh.rotation.x = -Math.PI/2;
    groundMesh.position.z += 4;
    groundMesh.receiveShadow = true;
    StartScreen.scene.add(groundMesh);
    //raycasterObjects.push(groundMesh);
    
    //lane
    var lane = [];
    lane.push( new THREE.Vector2(-0.5,-0.5));
    lane.push( new THREE.Vector2(-0.5,0.5));
    lane.push( new THREE.Vector2(0.5,0.5));
    lane.push( new THREE.Vector2(0.5,-0.5));
    var laneShape = new THREE.Shape(lane);
    var geometry = new THREE.ShapeBufferGeometry( laneShape );

    var mesh = new THREE.Mesh(
        geometry, 
        new THREE.MeshPhongMaterial( { 
            color: 0x354001, 
            side: THREE.DoubleSide 
        } ) 
    );
    mesh.rotation.set(Math.PI/2,0,0);
    mesh.receiveShadow = true;
	StartScreen.scene.add( mesh );

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

var passingObjMain = {
    MODELS : LOADING_MODELS,
    UNITS : LOADING_UNITS,
    worldScene : StartScreen.scene,
    loadingManager : StartScreen.loadingManager,
    SteeringEntities : StartScreen.SteeringEntities,
    mainCharacteres : StartScreen.mainCharacteres,
    Obstacles : StartScreen.Obstacles,
    mixers : StartScreen.mixers
}

CustomGLTFLoader(passingObjMain);

export {StartScreen};