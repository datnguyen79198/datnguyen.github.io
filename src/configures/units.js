const UNITS = [
    {
        name : 'boxman',
        position : { x: 0.5, y: 0, z: 9.5 },
        animation : 'PaperboxGuy_Run',
        rotation : null,
        specific : null,
        entity_type : 'Main_character',
        scale : 0.3
    }, 
    {
        name : 'fishingman',
        position : { x: -6, y: -0.8, z: -4.7 },
        animation : 'Take 001',
        rotation : {x:0, y:Math.PI, z: 0},
        specific : null,
        entity_type : null,
        scale : 0.015
    },
    {
        name : 'water',
        position : { x: -0.3, y: 0, z: -11},
        animation : null,
        rotation : {x:0, y:-Math.PI/2, z: 0},
        entity_type : null,
        scale : 0.55
    },
    {
        name : 'old_peir',
        position : { x: -6, y: -0.46, z: -4.5},
        animation : null,
        rotation : null,
        entity_type : null,
        scale : 0.006
    },
    {
        name : 'tree_autumn',
        position : { x: -8, y: -5.8, z: -4.9},
        animation : null,
        rotation : null,
        entity_type : 'Obstacle',
        scale : 0.4
    },
    {
        name : 'tree_autumn',
        position : { x: 6, y: -5.8, z: 3},
        animation : null,
        rotation : null,
        entity_type : 'Obstacle',
        scale : 0.4
    },
    {
        name : 'tree_autumn',
        position : { x: 9, y: -5.8, z: 0},
        animation : null,
        rotation : null,
        entity_type : 'Obstacle',
        scale : 0.4
    },
    {
        name : 'tree_autumn',
        position : { x: -3, y: -5.8, z: 3},
        animation : null,
        rotation : null,
        entity_type : 'Obstacle',
        scale : 0.4
    },
    {
        name : 'cloud',
        position : { x: 0, y: 10, z: 0},
        animation : null,
        rotation : null,
        entity_type : 'Steering',
        scale : 0.03
    },
    {
        name : 'cloud',
        position : { x: 0, y: 10, z: 2},
        animation : null,
        rotation : null,
        entity_type : 'Steering',
        scale : 0.03
    },
    {
        name : 'cloud',
        position : { x: -5, y: 10, z: -3},
        animation : null,
        rotation : null,
        entity_type : 'Steering',
        scale : 0.03
    },
    {
        name : 'tavern',
        position : { x: 8, y: 0, z: 1},
        animation : null,
        rotation : {x:0, y:Math.PI/2 + 0.35, z: 0},
        entity_type : 'Obstacle',
        scale : 0.4
    },
    {
        name : 'notice_board',
        position : { x: 8.5, y: -0.4, z: 5.6},
        animation : null,
        rotation : {x:0, y:Math.PI/2, z: 0},
        entity_type : 'Obstacle',
        scale : 0.7
    },
    {
        name : 'well',
        position : { x: 0.5, y: 0, z: 3.5},
        animation : null,
        rotation : null,
        entity_type : 'Obstacle',
        scale : 0.1
    },
    {
        name : 'cat',
        position : { x: 5, y: 0.4, z: 3},
        animation : "ArmatureAction",
        rotation : null,
        entity_type : 'Steering',
        scale : 0.4
    }
];

const award = [
    {
        id : 4,
        scale : 0.06,
        position : { x:0, y: 0, z:0.1},
        rotation : {x:0, y:Math.PI/2, z: 0}
    },
    {
        id : 3,
        scale : 1.8,
        position : { x:-0.53, y: -0.35, z:-0.5},
        rotation : null
    },
    {
        id : 1,
        scale : 0.3,
        position : { x:0, y: 0, z:0},
        rotation : null
    },
    {
        id : 1,
        scale : 0.3,
        position : { x:0, y: 0, z:0},
        rotation : null
    },
    {
        id : 1,
        scale : 0.3,
        position : { x:0, y: 0, z:0},
        rotation : null
    },
    {
        id : 0,
        scale : 0.11,
        position : { x:0, y: 0, z:0},
        rotation : {x:0, y:Math.PI/2, z: 0}
    },
    {
        id : 1,
        scale : 0.3,
        position : { x:0, y: 0, z:0},
        rotation : null
    },
    {
        id : 2,
        scale : 0.3,
        position : { x:-0.65, y: -0.93, z:-0.45},
        rotation : {x:0, y:Math.PI/2, z: 0}
    }
];

for (let i=0;i<8;i++) {
    UNITS.push({
        name : 'pedestal',
        position : { x: -9.5, y: 0, z: 9.5 - i * 1.1},
        animation : null,
        rotation : null,
        entity_type : 'Obstacle',
        scale : 0.07
    });
    UNITS.push({
        name : 'award_' + String(award[i].id),
        position : { x: -9.45 + award[i].position.x, y: 0.8+ award[i].position.y, z: 9.5 - i * 1.1+ award[i].position.z},
        animation : null,
        rotation : award[i].rotation,
        entity_type : null,
        scale : award[i].scale
    });
}

export {UNITS};