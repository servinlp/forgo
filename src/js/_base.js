/* global THREE */

const scene = new THREE.Scene,

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ),
	camBox = new THREE.Object3D()

camera.position.z = 5
camera.position.y = 2
camBox.name = 'camBox'

camBox.add( camera )
scene.add( camBox )

const renderer = new THREE.WebGLRenderer( { antialias: true } )
renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setPixelRatio( window.devicePixelRatio )
document.body.appendChild( renderer.domElement )
window.addEventListener( 'resize', resize )

const controls = new THREE.OrbitControls( camera, renderer.domElement )
controls.enableZoom = true

function resize() {

	renderer.setSize( window.innerWidth, window.innerHeight )
	renderer.setPixelRatio( window.devicePixelRatio )

}

export {
	scene,
	camera,
	camBox,
	renderer,
	controls
}