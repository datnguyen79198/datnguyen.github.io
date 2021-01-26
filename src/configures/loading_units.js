const LOADING_UNITS = [
    {
        name : 'truck',
        position : { x: -1.8, y: 0.04, z: 1 },
        //animation : ['Scene'],
        animation : null,
        rotation : null,
        specific : null,
        entity_type : 'Steering',
        maxSpeed : 0.01,
        wanderDistance : 0.2,
        wanderAngle: 0.4,
        wanderRadius: 0.02,
        wanderRange: 0.4,
        scale : 0.001
    },
    {
        name : 'bush',
        position : { x: 1, y: 0, z: 0.5 },
        //animation : ['Scene'],
        animation : null,
        rotation : null,
        specific : null,
        entity_type : 'Obstacles',
        scale : 0.0025
    },
    {
        name : 'bush',
        position : { x: -1, y: 0, z: -1 },
        //animation : ['Scene'],
        animation : null,
        rotation : null,
        specific : null,
        entity_type : 'Obstacles',
        scale : 0.0025
    },
    {
        name : 'bush',
        position : { x: 2, y: 0, z: 1.5 },
        //animation : ['Scene'],
        animation : null,
        rotation : null,
        specific : null,
        entity_type : 'Obstacles',
        scale : 0.0025
    },
    {
        name : 'bush',
        position : { x: 2.5, y: 0, z: 0.7 },
        //animation : ['Scene'],
        animation : null,
        rotation : null,
        specific : null,
        entity_type : 'Obstacles',
        scale : 0.0025
    },
    {
        name : 'bush',
        position : { x: -1, y: 0, z: 1.4 },
        //animation : ['Scene'],
        animation : null,
        rotation : null,
        specific : null,
        entity_type : 'Obstacles',
        scale : 0.0025
    },
    {
        name : 'bush',
        position : { x: 5, y: 0, z: -2.5 },
        //animation : ['Scene'],
        animation : null,
        rotation : null,
        specific : null,
        entity_type : 'Obstacles',
        scale : 0.0025
    },
    {
        name : 'house',
        position : { x: -2.3, y: -0.03, z: -1},
        animation : null,
        rotation : null,
        specific : null,
        entity_type : 'Obstacles',
        scale : 0.01
    },
    {
        name : 'tree',
        position : { x: 2, y: 0, z: -2},
        animation : null,
        rotation : null,
        specific : null,
        entity_type : 'Obstacles',
        scale : 0.07
    },
    {
        name : 'tree',
        position : { x: 2, y: 0, z: -1.7},
        animation : null,
        rotation : null,
        specific : null,
        entity_type : 'Obstacles',
        scale : 0.07
    },
    {
        name : 'tree',
        position : { x: 1.8, y: 0.2, z: -1.5},
        animation : null,
        rotation : {x : 0.3, y: Math.PI/2, z:0},
        specific : null,
        entity_type : 'Obstacles',
        scale : 0.07
    },
    {
        name : 'axe',
        position : { x: 1.55, y: 0.45, z: -1.7},
        animation : null,
        rotation : {x : Math.PI/2, y : 0, z: -Math.PI/2 + 0.5},
        specific : null,
        entity_type : 'Obstacles',
        scale : 0.7
    },
    {
        name : 'tent',
        position : { x: 0.2, y: 0, z: -1.8},
        animation : null,
        rotation : {x : 0, y : -0.5, z: 0},
        specific : null,
        entity_type : 'Obstacles',
        scale : 0.35
    }
]

export {LOADING_UNITS}