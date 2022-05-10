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

const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

createLayer({x: 0, y: 0, z: 0});

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
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
    const posOffset = {
        x: origin.x, y: origin.y, z: origin.z
    };
    
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