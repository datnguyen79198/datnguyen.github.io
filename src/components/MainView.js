import { useEffect } from 'react';
import * as THREE from 'three';

import { MODELS } from '../configures/models';
import { UNITS } from '../configures/units';
import { LOADING_MODELS } from '../configures/loading_models';
import { LOADING_UNITS } from '../configures/loading_units';
import { TEXTS_INTRO,TEXTS_AWARD } from '../configures/texts';

import { StartScreen } from './StartScreen';
import { LoadingScreen } from './LoadingScreen';

import { TextLoader } from '../ultis/TextLoader';
import { CustomGLTFLoader, InitiateUnits, ChangeAnimation} from '../ultis/CustomGLTFLoader';

const MainView = (src) => {
    useEffect(() => {
        var worldScene,camera,renderer,clock;
        var groundMesh;
        var mixers = [];
        var Obstacles = [], SteeringEntities = [], mainCharacteres = [], fishes = [];
        var boundingGround,boundingSky,boundingSea,mainCharacter;
        var RESOURCES_LOADED = false, START_RENDERING = false;
        var loadingManager,loader;
        var passingObj = {
            scene : null,
            objects : null
        };
        var boardGeo,boardMat,cinemaBoard,boardTexture,boardIndex=0;
        var mouse,raycaster;

        const InitLoadingScene = () => {
            mouse = new THREE.Vector2();
            raycaster = new THREE.Raycaster();
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

            StartScreen.loadingManager.onLoad = () => {

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
                
                InitiateUnits(passingObjMain);

                RESOURCES_LOADED = true;
            }
        }

        const InitScene = () => {
            //worldScene
            worldScene = new THREE.Scene();
            worldScene.background = new THREE.Color(0xDDFFFD);

            //camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
            //camera.position.set(0, 1, 3);
            camera.position.set(5, 2, 4);
            camera.lookAt(10,2,4);
            //camera.lookAt(worldScene.position);

            //light 
            const HemisphereLight = new THREE.HemisphereLight( 0xFFF6DD, 0x05050C, 1.1 );
            worldScene.add(HemisphereLight);

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

            //custom texture onto plane
            createBoard(0);

            //window events
            window.addEventListener('resize', onWindowResize, false);
            window.addEventListener('mousedown',onMouseDown, false);

        }

        const createBoard = (index) => {
            if (cinemaBoard) {
                cinemaBoard.geometry.dispose();
                cinemaBoard.material.dispose();
                worldScene.remove(cinemaBoard);
            }
            boardGeo = new THREE.PlaneGeometry(1.75,0.84);
            let url = './images/' + String(index) +'.png';
            boardTexture = new THREE.TextureLoader().load(url);
            boardMat = new THREE.MeshLambertMaterial( {map : boardTexture} );
            cinemaBoard = new THREE.Mesh(boardGeo,boardMat);
            cinemaBoard.position.set(7.125,1.02,4.5);
            cinemaBoard.rotation.set(0,-Math.PI/2,0);
            worldScene.add(cinemaBoard);
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
        var beenMouseover = false;

        const AnimateStartScreen = () => {
            requestAnimationFrame(animate);
            
            const mixerUpdateDelta = clock.getDelta();

            for (let i=0; i<StartScreen.mixers.length; i++) {
                StartScreen.mixers[i].mixer.update(mixerUpdateDelta);
            }

            
            var truckObject = StartScreen.SteeringEntities[0];
            //console.log(StartScreen.road);
            truckObject.followPath(StartScreen.road, 0.2);
            if (StartScreen.road.length>0) truckObject.lookWhereGoing();
            truckObject.update();

            if (truckObject.cutScreen) START_RENDERING = true;
            
            if (StartScreen.intersect !== null || StartScreen.road.length > 0) {
                if (StartScreen.raycasterObjects[0] !== undefined) StartScreen.raycasterObjects[0].visible = false;
                if (StartScreen.invisibleObj[0] !== undefined) StartScreen.invisibleObj[0].visible = true;
                if (!beenMouseover) {
                    let passingObjMain = {
                        MODELS : LOADING_MODELS,
                        UNITS : LOADING_UNITS,
                        worldScene : StartScreen.scene,
                        loadingManager : StartScreen.loadingManager,
                        SteeringEntities : StartScreen.SteeringEntities,
                        mainCharacteres : StartScreen.mainCharacteres,
                        Obstacles : StartScreen.Obstacles,
                        mixers : StartScreen.mixers
                    }

                    ChangeAnimation(passingObjMain,truckObject,'Scene');
                    beenMouseover = true;
                }

            } else {
                if (StartScreen.raycasterObjects[0] !== undefined) StartScreen.raycasterObjects[0].visible = true;
                if (StartScreen.invisibleObj[0] !== undefined) StartScreen.invisibleObj[0].visible = false;

                if (beenMouseover) {
                    let passingObjMain = {
                        MODELS : LOADING_MODELS,
                        UNITS : LOADING_UNITS,
                        worldScene : StartScreen.scene,
                        loadingManager : StartScreen.loadingManager,
                        SteeringEntities : StartScreen.SteeringEntities,
                        mainCharacteres : StartScreen.mainCharacteres,
                        Obstacles : StartScreen.Obstacles,
                        mixers : StartScreen.mixers
                    }
                    ChangeAnimation(passingObjMain,truckObject,null);
                    beenMouseover = false;
                }
            }
            
            renderer.render(StartScreen.scene, StartScreen.camera);
        }

        const AnimateLoadingScreen = () => {
            requestAnimationFrame(animate);
            renderer.render(LoadingScreen.scene, LoadingScreen.camera);
        }

        const animate = () => {
            if (RESOURCES_LOADED === false) {
                AnimateLoadingScreen();
                return;
            }

            if (START_RENDERING === false) {
                AnimateStartScreen();
                return;
            }

            if (Date.now() >= timetarget) {

                const mixerUpdateDelta = clock.getDelta();

                for (let i=0; i<mixers.length; i++) {
                    mixers[i].mixer.update(mixerUpdateDelta);
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

        const onMouseDown = (event) => {
            event.preventDefault();

            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1; 
    
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObject(cinemaBoard);
            if (intersects.length > 0) {
                //console.log(intersects[0].point.x + ' ' + intersects[0].point.y + ' ' + intersects[0].point.z) 
                //7.125 0.748331188054677 4.290530456818139
                //7.125 0.680323309527247 4.650000671891698
                var iy = intersects[0].point.y, iz = intersects[0].point.z;
                if (boardIndex===0 && iy >= 0.680323309527247 && iy <= 0.748331188054677 && 
                    iz >= 4.290530456818139 && iz <= 4.650000671891698) {
                        boardIndex+=1;
                        createBoard(boardIndex);
                    }
            }

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