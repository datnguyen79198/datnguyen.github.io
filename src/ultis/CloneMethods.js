import * as THREE from 'three';

const GLTFClone = (gltf) => {
    const clone = {
        animations : gltf.animations,
        scene : gltf.scene.clone(true)
    }

    const skinnedMeshes = {};

    gltf.scene.traverse(node => {
        if (node.isSkinnedMesh) {
            skinnedMeshes[node.name] = node;
        }
    })

    const cloneBones = {};
    const cloneSkinnedMeshes = {};

    clone.scene.traverse(node => {
        if (node.isBone) {
            cloneBones[node.name] = node;
        }

        if (node.isSkinnedMesh) {
            cloneSkinnedMeshes[node.name] = node;
        }
    });

    for (let name in skinnedMeshes) {
        const SMesh = skinnedMeshes[name];
        const skeleton = SMesh.skeleton;
        const cloneSMesh = cloneSkinnedMeshes[name];

        const orderedCloneBone = [];

        for (let i=0;i<skeleton.bones.length;i++) {
            const cloneBone = cloneBones[skeleton.bones[i].name];
            orderedCloneBone.push(cloneBone);
        }

        cloneSMesh.bind(
            new THREE.Skeleton(orderedCloneBone, skeleton.boneInverses),
            cloneSMesh.matrixWorld
        );
    }

    return clone;
}

const SceneClone = (scene) => {
    const clone = scene.clone(true)

    const skinnedMeshes = {};

    scene.traverse(node => {
        if (node.isSkinnedMesh) {
            skinnedMeshes[node.name] = node;
        }
    })

    const cloneBones = {};
    const cloneSkinnedMeshes = {};

    clone.traverse(node => {
        if (node.isBone) {
            cloneBones[node.name] = node;
        }

        if (node.isSkinnedMesh) {
            cloneSkinnedMeshes[node.name] = node;
        }
    });

    for (let name in skinnedMeshes) {
        const SMesh = skinnedMeshes[name];
        const skeleton = SMesh.skeleton;
        const cloneSMesh = cloneSkinnedMeshes[name];

        const orderedCloneBone = [];

        for (let i=0;i<skeleton.bones.length;i++) {
            const cloneBone = cloneBones[skeleton.bones[i].name];
            orderedCloneBone.push(cloneBone);
        }

        cloneSMesh.bind(
            new THREE.Skeleton(orderedCloneBone, skeleton.boneInverses),
            cloneSMesh.matrixWorld
        );
    }

    return clone;
}

export {GLTFClone,SceneClone};