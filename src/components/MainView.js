import { useEffect } from 'react';
import * as THREE from 'three';

import { MODELS } from '../configures/models';
import { UNITS } from '../configures/units';
import { TEXTS_INTRO,TEXTS_AWARD } from '../configures/texts';
import { StartScreen } from './StartScreen';

import { TextLoader } from '../ultis/TextLoader';
import { CustomGLTFLoader, InitiateUnits} from '../ultis/CustomGLTFLoader';

const MainView = (src) => {
    useEffect(() => {
        var worldScene,camera,renderer,clock;
        var groundMesh;
        var mixers = [];
        var Obstacles = [], SteeringEntities = [], mainCharacteres = [], fishes = [];
        var boundingGround,boundingSky,boundingSea,mainCharacter;
        var START_RENDERING = false;
        var loadingManager,loader;
        var passingObj = {
            scene : null,
            objects : null
        };

        const InitLoadingScene = () => {
            loadingManager = new THREE.LoadingManager();

            loadingManager.onLoad = () => {
                var passingObjMain = {
                    MODELS : MODELS,
                    UNITS : UNITS,
                    worldScene : worldScene,
                    loadingManager : loadingManager,
                    SteeringEntities : SteeringEntities,
                    mainCharacteres : mainCharacteres,
                    Obstacles : Obstacles,
                    mixers : mixers
                }
                
                InitiateUnits(passingObjMain);

                mainCharacter = mainCharacteres[0];
            }
        }

        const InitScene = () => {
            //worldScene
            worldScene = new THREE.Scene();
            worldScene.background = new THREE.Color(0xDDFFFD);

            //camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
            //camera.position.set(0, 1, 3);
            camera.position.set(0, 10, 13);
            //camera.lookAt(10,1,3);
            camera.lookAt(worldScene.position);

            //light 
            const HemisphereLight = new THREE.HemisphereLight( 0xFFF6DD, 0x05050C, 1.1 );
            worldScene.add(HemisphereLight);

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
            worldScene.add(sunLight);

            //clock 
            clock = new THREE.Clock()

            //loader text
            loader = new THREE.FontLoader( loadingManager );
            /*
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
            worldScene.add(Ox);
            worldScene.add(Oy);
            worldScene.add(Oz);
            */
            //ground 
            const groundGeo = new THREE.PlaneBufferGeometry(20,12);
            const groundMat = new THREE.MeshPhongMaterial({ color: 0x6D3E05});
            groundMesh = new THREE.Mesh(groundGeo,groundMat);
            groundMesh.rotation.x = -Math.PI/2;
            groundMesh.position.z += 4;
            groundMesh.receiveShadow = true;
            worldScene.add(groundMesh);

            boundingGround = new THREE.Box3(new THREE.Vector3(-8.5,0,-1), new THREE.Vector3(8.5,0,8.5));
            boundingSky = new THREE.Box3(new THREE.Vector3(-10,0,-5), new THREE.Vector3(3,0,3));
            boundingSea = new THREE.Box3(new THREE.Vector3(-9,0,-15), new THREE.Vector3(9,0,-3));

            passingObj = {
                scene : worldScene,
                objects : Obstacles
            }

            //text
            for (let i=0; i<TEXTS_INTRO.length; i++) {
                TextLoader(loader, TEXTS_INTRO[i],'./fonts/Sketch_3D_Regular.json', 0xF0E1D1, passingObj);
            }

            for (let i=0; i<TEXTS_AWARD.length; i++) {
                TextLoader(loader, TEXTS_AWARD[i],'./fonts/Bakso.json', 0xBF0303, passingObj);
            }

            //window events
            window.addEventListener('resize', onWindowResize, false);

        }
        
        const InitRenderer = () => {
            //renderer
            renderer = new THREE.WebGLRenderer({ antialias: true});
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.gammaOutput = true;
            document.getElementById(src).appendChild(renderer.domElement);
        }

        const loadModels = () => {
            var passingObjMain = {
                MODELS : MODELS,
                UNITS : UNITS,
                worldScene : worldScene,
                loadingManager : loadingManager,
                SteeringEntities : SteeringEntities,
                mainCharacter : mainCharacter,
                Obstacles : Obstacles,
                mixers : mixers
            }
    
            CustomGLTFLoader(passingObjMain);
            
        }

        const gameLogic = () => {

            if (mainCharacter) {
                mainCharacter.update();
            }

            for (let i=0;i<SteeringEntities.length;i++) {
                var unit = SteeringEntities[i];
                if (unit.name.includes('fish_')) fishes.push(unit);
            }

            for (let i=0;i<SteeringEntities.length;i++) {
                var steeringObj = SteeringEntities[i];
                if (steeringObj.name === 'cat') {
                    steeringObj.wander(boundingGround);
                    if (Obstacles.length > 0) steeringObj.avoid(Obstacles);
                    if (mainCharacter!==null) steeringObj.avoid(mainCharacter);
                    if (mainCharacter!==null) steeringObj.evade(mainCharacter);
                    steeringObj.lookWhereGoing();
                    steeringObj.bounce(boundingGround);
                }

                if (steeringObj.name.includes('fish_')) {
                    steeringObj.wander(boundingSea);
                    if (fishes.length > 0) steeringObj.avoid(fishes);
                    steeringObj.lookWhereGoing();
                    steeringObj.bounce(boundingSea);
                }
                
                if (steeringObj.name === 'cloud') {
                    steeringObj.wander(boundingSky);
                    steeringObj.bounce(boundingSky);
                }
                steeringObj.update();
            }
        }

        var dt = 1000/60;
        var timetarget = 0;

        const AnimateStartScreen = () => {
            requestAnimationFrame(animate);

            if (StartScreen.intersect !== null) {
                if (StartScreen.raycasterObjects[0] !== undefined) StartScreen.raycasterObjects[0].visible = false;
                if (StartScreen.invisibleObj[0] !== undefined) StartScreen.invisibleObj[0].visible = true;
                setTimeout(() => {
                    START_RENDERING = true;
                }, 5000);

            } else {
                if (StartScreen.raycasterObjects[0] !== undefined) StartScreen.raycasterObjects[0].visible = true;
                if (StartScreen.invisibleObj[0] !== undefined) StartScreen.invisibleObj[0].visible = false;
            }
            renderer.render(StartScreen.scene, StartScreen.camera);
        }

        const animate = () => {

            if (START_RENDERING === false) {
                AnimateStartScreen();
                return;
            } else {
                StartScreen.scene.remove.apply(StartScreen.scene, StartScreen.scene.children);
            }

            if (Date.now() >= timetarget) {

                const mixerUpdateDelta = clock.getDelta();

                for (let i=0; i<mixers.length; i++) {
                    mixers[i].update(mixerUpdateDelta);
                }

                gameLogic();
                
                renderer.render(worldScene, camera);

                timetarget += dt;
                if (Date.now() >= timetarget) {
                    timetarget = Date.now();
                }
            }
            requestAnimationFrame(animate);
        }

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        const onPushKeyboard = (event) => {
            var keyName = event.key;
            //console.log(keyName);
            if (keyName === 'w') {
                mainCharacter.moveUp();
            } else if (keyName === 's') {
                mainCharacter.moveDown();
            } else if (keyName === 'a') {
                mainCharacter.moveLeft();
            } else if (keyName === 'd') {
                mainCharacter.moveRight();
            }
            
        }

        const onReleaseKeyboard = (event) => {
            var keyName = event.key;
            //console.log(keyName);
            if (keyName === 'w') {
                mainCharacter.unMoveUp();
            } else if (keyName === 's') {
                mainCharacter.unMoveDown();
            } else if (keyName === 'a') {
                mainCharacter.unMoveLeft();
            } else if (keyName === 'd') {
                mainCharacter.unMoveRight();
            }
        }

        const onPressKeyboard = (event) => {
            var keyName = event.key;
            if (keyName === ' ') {
                mainCharacter.jumpUp();
            }
        }


        //main prog

        InitScene(); 
        InitRenderer();
        InitLoadingScene();
        loadModels();
        animate();
        document.addEventListener('keydown',onPushKeyboard,false);
        document.addEventListener('keyup',onReleaseKeyboard,false);
        document.addEventListener('keypress',onPressKeyboard,false);
        //console.log(worldScene.children);
        return () => {
            document.getElementById(src).removeChild(renderer.domElement);
        }
    }, [src])
}

export default MainView;