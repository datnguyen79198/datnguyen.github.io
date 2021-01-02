import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { MODELS } from '../configures/models';
import { UNITS } from '../configures/units';
import { TEXTS_INTRO,TEXTS_AWARD } from '../configures/texts';
import { SteeringEntity } from '../components/SteeringEntity';
import { Entity } from '../components/Entity';

const MainView = (src) => {
    useEffect(() => {
        var worldScene,camera,renderer,clock;
        var groundMesh;
        var mixers = [];
        var hasBeen = {};

        const InitScene = () => {
            //worldScene
            worldScene = new THREE.Scene();
            worldScene.background = new THREE.Color(0xDDFFFD);

            //camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
            //camera.position.set(0, 1, 3);
            camera.position.set(0, 2, 13);
            //camera.lookAt(10,1,3);

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

            //ground 
            const groundGeo = new THREE.PlaneBufferGeometry(20,12);
            const groundMat = new THREE.MeshPhongMaterial({ color: 0xA55001});
            groundMesh = new THREE.Mesh(groundGeo,groundMat);
            groundMesh.rotation.x = -Math.PI/2;
            groundMesh.position.z += 4;
            groundMesh.receiveShadow = true;
            worldScene.add(groundMesh);

            //text
            var loader = new THREE.FontLoader();
            for (let i=0; i<TEXTS_INTRO.length; i++) {
                let textGeo;
                loader.load('./fonts/Sketch_3D_Regular.json', (font) => {
                    textGeo = new THREE.TextGeometry(TEXTS_INTRO[i].text, {
                        font : font,
                        size: TEXTS_INTRO[i].size,
                        height: TEXTS_INTRO[i].height,
                        curveSegments: TEXTS_INTRO[i].curveSegments,
                        bevelEnabled: TEXTS_INTRO[i].bevelEnabled,
                        bevelThickness: TEXTS_INTRO[i].bevelThickness,
                        bevelSize: TEXTS_INTRO[i].bevelSize,
                        bevelSegments: TEXTS_INTRO[i].bevelSegments
                    })

                    let textMat = new THREE.MeshPhongMaterial({ color: 0xF0E1D1 });
                    let textMesh = new THREE.Mesh(textGeo, textMat);
                    textMesh.position.set(TEXTS_INTRO[i].position.x,TEXTS_INTRO[i].position.y,TEXTS_INTRO[i].position.z);
                    if (TEXTS_INTRO[i].rotation) {
                        textMesh.rotation.set(TEXTS_INTRO[i].rotation.x,TEXTS_INTRO[i].rotation.y,TEXTS_INTRO[i].rotation.z);
                    }
                    textMesh.castShadow = true;
                    textMesh.receiveShadow = true;

                    var textEntity = new Entity(textMesh);
                    worldScene.add(textEntity);
                });
            }

            for (let i=0; i<TEXTS_AWARD.length; i++) {
                let textGeo;
                loader.load('./fonts/Bakso.json', (font) => {
                    textGeo = new THREE.TextGeometry(TEXTS_AWARD[i].text, {
                        font : font,
                        size: TEXTS_AWARD[i].size,
                        height: TEXTS_AWARD[i].height,
                        curveSegments: TEXTS_AWARD[i].curveSegments,
                        bevelEnabled: false
                    })

                    let textMat = new THREE.MeshPhongMaterial({ color: 0x5F1515 });
                    let textMesh = new THREE.Mesh(textGeo, textMat);
                    textMesh.position.set(TEXTS_AWARD[i].position.x,TEXTS_AWARD[i].position.y,TEXTS_AWARD[i].position.z);
                    if (TEXTS_AWARD[i].rotation) {
                        textMesh.rotation.set(TEXTS_AWARD[i].rotation.x,TEXTS_AWARD[i].rotation.y,TEXTS_AWARD[i].rotation.z);
                    }
                    textMesh.castShadow = true;
                    textMesh.receiveShadow = true;

                    var textEntity = new Entity(textMesh);
                    worldScene.add(textEntity);
                });
            }


            //resize event
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

        const LoadModels = () => {
            var num=0;
            for (let i=0; i< MODELS.length; i++) {
                const model = MODELS[i];
                loadGLTFModel(model , () => {
                    num++;

                    if (num===MODELS.length) {
                        InitiateUnits();
                    }
                });
            }
        }

        const GetModelByName = (unitName) => {
            for (let i=0; i<MODELS.length; i++) {
                if (unitName.includes(MODELS[i].name)) {
                    return MODELS[i];
                }
            }

            return null;
        }

        const InitiateUnits = () => {
            for (let i=0; i<UNITS.length; i++) {

                const unit = UNITS[i];
                const model = GetModelByName(unit.name);

                if (model) {
                    var unitScene;
                    if (unit.specific) {
                        model.scene.traverse((obj) => {
                            if (obj.isMesh) {
                                if (obj.name[0] === unit.specific) {
                                    unitScene = obj;
                                }
                            }
                        })
                    } else { /* Need clone deeper if wanna clone animated mesh */
                        if (hasBeen[model.name]) {
                            unitScene = model.scene.clone();
                        } else {
                            unitScene = model.scene;
                            hasBeen[model.name] = true;
                        }
                    }

                    const modelAnimations = model.animations;

                    if (unit.position) {
                        unitScene.position.set(unit.position.x, unit.position.y, unit.position.z);
                    }

                    if (unit.scale) {
                        unitScene.scale.set(unit.scale, unit.scale, unit.scale);
                    }

                    if (unit.rotation) {
                        unitScene.rotation.set(unit.rotation.x, unit.rotation.y, unit.rotation.z)
                    }

                    if (unit.animation) {
                        const mixer = StartAnimation(unitScene, modelAnimations, unit.animation);
                        mixers.push(mixer);
                    }
                    
                    var unitEntity;
                    if (unit.entity_type === 'Steering') {
                        unitEntity = new SteeringEntity(unitScene);
                    } else {
                        unitEntity = new Entity(unitScene);
                    }
                    worldScene.add(unitEntity);

                } else {
                    console.error("not found model");
                }
            }
        }

        const loadGLTFModel = (model, onLoad) => {
            const loader = new GLTFLoader();
            const url_model = model.url;
            //console.log('load model from ' + url_model);

            loader.load(url_model, (gltf) => {

                gltf.scene.traverse((obj) => {
                    if (obj.isMesh) {
                        obj.castShadow = model.castShadow;
                        obj.receiveShadow = model.receiveShadow;
                    }
                })

                model.scene = gltf.scene;
                model.animations = gltf.animations;
                if (model.name === 'cat' | model.name==='cutie') console.log(model.animations);

                onLoad();
            })
        }

        const StartAnimation = (mesh, animations, animationName) => {
            const mixer = new THREE.AnimationMixer(mesh);
            const clip = THREE.AnimationClip.findByName(animations, animationName);

            //console.log(clip);
            
            if (clip) {
                const action = mixer.clipAction(clip);
                action.play();
            }

            return mixer;
        }

        const gameLogic = () => {
            
        }

        var dt = 1000/60;
        var timetarget = 0;

        const animate = () => {
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

        const onDocumentKeyboard = (event) => {
            var keyName = event.key;
            //console.log(keyName);
            if (keyName === 'ArrowUp') {
                camera.position.z -= 0.5;
            } else if (keyName === 'ArrowDown') {
                camera.position.z += 0.5;
            } else if (keyName === 'ArrowLeft') {
                camera.position.x -= 0.5;
            } else if (keyName === 'ArrowRight') {
                camera.position.x += 0.5;
            } else if (keyName === 'w') {
                camera.position.y += 0.5;
            } else if (keyName === 's') {
                camera.position.y -= 0.5;
            } else if (keyName === 'q') {
                camera.rotation.x += 0.5;
            } else if (keyName === 'e') {
                camera.rotation.x -= 0.5;
            }
            
        }

        //main prog
        InitScene(); 
        InitRenderer();
        LoadModels();
        document.addEventListener('keydown',onDocumentKeyboard,false);
        animate();

        return () => {
            document.getElementById(src).removeChild(renderer.domElement);
        }
    }, [src])
}

export default MainView;