const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 64;

const squareDimension = 3;
const cubeSize = 16;
const gap = 2;
const cubes = [];
const zeroVec3 = new THREE.Vector3();

const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
});
let timer = 0;

//createLayer(zeroVec3);
//cubes.push(newCube(zeroVec3));
//rotateCube(cubes[0], Math.PI/3);

initCartesianLine('x');
initCartesianLine('y');
initCartesianLine('z');

function animate() {
    timer += 1;
	requestAnimationFrame( animate );

    if (timer % 60 == 0) {
        //rotateCube(cubes[0], Math.PI/2);
        timer = 0;
    }
    
	renderer.render( scene, camera );
}

function initCartesianLine(axis ='x', scale = 40) {
    let hexColor;
    const points = [new THREE.Vector3()];

    switch (axis) {
        case 'x':
            hexColor = 0xff0000;
            points.push(new THREE.Vector3(scale, 0, 0));
            break;
        case 'y':
            hexColor = 0x00ff00;
            points.push(new THREE.Vector3(0, scale, 0));
            break;
        case 'z':
            hexColor = 0x0000ff;
            points.push(new THREE.Vector3(0, 0, scale));
            break;
    }

    const material = new THREE.LineBasicMaterial({
        color: hexColor
    });
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
    const line = new THREE.Line(geometry, material);
    scene.add(line);
}

function rotateCube(cube, radians) {
    // var cubePos = new THREE.Vector3();
    // cube.getWorldPosition(cubePos);
    // console.log(cubePos);

    var rotMat = new THREE.Matrix4();

    rotMat.set(Math.cos(radians), -Math.sin(radians), 0, 0,
               Math.sin(radians),  Math.cos(radians), 0, 0,
               0                ,  0                , 1, 0,
               0                ,  0                , 0, 1
    );

    // rotMat.set(Math.cos(radians), -Math.sin(radians),
    //            Math.sin(radians),  Math.cos(radians)
    // );
    
    // var newTrans = rotMat.premultiply(cube.matrix);
    // console.log(newTrans);
    cube.applyMatrix4(rotMat);
}

function newCube(origin) {
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cube = new THREE.Mesh( geometry, material );
    cube.position.x += origin.x;
    cube.position.y += origin.y;
    cube.position.z += origin.z;
    scene.add( cube );
    return cube;
}

function createLayer(origin) {
    const posOffset = new THREE.Vector3(origin.x, origin.y, origin.z);
    
    for (let i = 0; i < squareDimension; i++) {
        for (let j = 0; j < squareDimension; j++) {
            // console.log(posOffset);
            const cube = newCube(posOffset, material);
            cubes.push(cube);
            posOffset.y += cubeSize + gap;
        }
        posOffset.x += cubeSize + gap;
        posOffset.y = 0;
    }
}

animate();