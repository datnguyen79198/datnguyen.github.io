const TEXTS_INTRO = [
    {
        text : `ACHIEVEMENTS`,
        position : {x: -8.5, y: 3, z: 2.7},
        rotation : {x:0, y:Math.PI/2, z:0.27},
        size: 0.4,
        height: 0.1,
        curveSegments: 2,
        bevelEnabled: true,
        bevelThickness: 0.001,
        bevelSize: 0.005,
        bevelSegments: 1
    },
    {
        text : `CONTACT`,
        position : {x: 5, y: 0, z: 5.5},
        rotation : {x:0, y:-Math.PI/2, z:0},
        size: 0.26,
        height: 0.09,
        curveSegments: 2,
        bevelEnabled: true,
        bevelThickness: 0.001,
        bevelSize: 0.005,
        bevelSegments: 1
    }
];

const TEXTS_AWARD = [
    {
        text : 'Silver medal',
        position : {x:-9.2, y: 0.3, z: 9.78},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    }, 
    {
        text : 'Vietnam Olympiad',
        position : {x:-9.2, y: 0.2, z: 9.78},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'Informatic-2016',
        position : {x:-9.2, y: 0.1, z: 9.78},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'Graduated from',
        position : {x:-9.2, y: 0.3, z: 9.78 - 1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'Tran Phu High school',
        position : {x:-9.2, y: 0.2, z: 9.87 - 1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'for gifted-2016',
        position : {x:-9.2, y: 0.1, z: 9.78 - 1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'ACM ICPC-2018',
        position : {x:-9.2, y: 0.3, z: 9.78 - 2*1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'Northern',
        position : {x:-9.2, y: 0.2, z: 9.78 - 2*1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'Eurasia Finals',
        position : {x:-9.2, y: 0.1, z: 9.78 - 2*1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'ACM ICPC-2019',
        position : {x:-9.2, y: 0.3, z: 9.78 - 3*1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'Northern',
        position : {x:-9.2, y: 0.2, z: 9.78 - 3*1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'Eurasia Finals',
        position : {x:-9.2, y: 0.1, z: 9.78 - 3*1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'ACM ICPC-2020',
        position : {x:-9.2, y: 0.3, z: 9.78 - 4*1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'Moscow',
        position : {x:-9.2, y: 0.2, z: 9.78 - 4*1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'Subregional',
        position : {x:-9.2, y: 0.1, z: 9.78 - 4*1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'Living well',
        position : {x:-9.2, y: 0.24, z: 9.75 - 5*1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.18,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'through 2020',
        position : {x:-9.2, y: 0.11, z: 9.82 - 5*1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.18,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'ACM ICPC-2021',
        position : {x:-9.2, y: 0.3, z: 9.78 - 6*1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'Moscow',
        position : {x:-9.2, y: 0.2, z: 9.78 - 6*1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'Subregional',
        position : {x:-9.2, y: 0.1, z: 9.78 - 6*1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'Graduated from',
        position : {x:-9.2, y: 0.4, z: 9.78 - 7*1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'Bauman Moscow State',
        position : {x:-9.2, y: 0.3, z: 9.87 - 7*1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : 'Technical University',
        position : {x:-9.2, y: 0.2, z: 9.87 - 7*1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    },
    {
        text : '2020',
        position : {x:-9.2, y: 0.1, z: 9.6 - 7*1.1},
        rotation : {x:0, y:Math.PI/2, z:0},
        size: 0.14,
        height: 0.01,
        curveSegments: 2
    }
]

const TEXTS_START = [
    {
        text : `START`,
        position : {x: -0.5, y: 0, z: 0},
        rotation : {x:-Math.PI/2, y:0, z:0},
        size: 0.2,
        height: 0.11,
        curveSegments: 1,
        bevelEnabled: true,
        bevelThickness: 0.001,
        bevelSize: 0.006,
        //bevelSize: 0.006,
        bevelSegments: 1
    },
    {
        text : `START`,
        position : {x: -0.5, y: 0, z: 0},
        rotation : {x:-Math.PI/2, y:0, z:0},
        size: 0.2,
        height: 0.11,
        curveSegments: 1,
        bevelEnabled: true,
        bevelThickness: 0.001,
        bevelSize: 0.0001,
        bevelSegments: 1
    }
]

const TEXTS_NAME = [
    {
        text : 'NGUYEN',
        position : {x:-0.6, y: 0, z: -2.5},
        rotation : null,
        size: 0.4,
        height: 0.25,
        curveSegments: 2,
        bevelEnabled: true,
        bevelThickness: 0.0001,
        bevelSize: 0.001,
        bevelSegments: 1
    },
    {
        text : 'T.D.',
        position : {x:1.6, y: 0, z: -2.5},
        rotation : null,
        size: 0.4,
        height: 0.25,
        curveSegments: 2,
        bevelEnabled: true,
        bevelThickness: 0.0001,
        bevelSize: 0.001,
        bevelSegments: 1
    },
    {
        text : 'fullstack',
        position : {x:0.9, y: 0, z: -1.7},
        rotation : {x:-Math.PI/2, y:0, z:0},
        size: 0.3,
        height: 0.07,
        curveSegments: 2,
        bevelEnabled: true,
        bevelThickness: 0.0001,
        bevelSize: 0.001,
        bevelSegments: 1
    },
    {
        text : 'developer',
        position : {x:0.6, y: 0, z: -1.3},
        rotation : {x:-Math.PI/2, y:0, z:0},
        size: 0.3,
        height: 0.07,
        curveSegments: 2,
        bevelEnabled: true,
        bevelThickness: 0.0001,
        bevelSize: 0.001,
        bevelSegments: 1
    }
]

export {TEXTS_INTRO , TEXTS_AWARD, TEXTS_START, TEXTS_NAME};