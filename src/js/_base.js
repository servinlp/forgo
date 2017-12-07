/* global THREE */

const scene = new THREE.Scene(),
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ),
	renderer = new THREE.WebGLRenderer( { antialias: true } ),
	controls = new THREE.OrbitControls( camera, renderer.domElement )

camera.position.z = 5
camera.position.y = 1
scene.add( camera )

renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setPixelRatio( window.devicePixelRatio )
document.body.appendChild( renderer.domElement )
window.addEventListener( 'resize', resize )

controls.enableZoom = true

function resize() {

	renderer.setSize( window.innerWidth, window.innerHeight )
	renderer.setPixelRatio( window.devicePixelRatio )

}

export {
	scene,
	camera,
	renderer,
	controls
}