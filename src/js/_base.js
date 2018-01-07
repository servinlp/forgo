/* global THREE */
import trees from './allTrees'
import { tree, setTree } from './tree'
import { cliff } from './cliff'
import { terrain } from './terrain'

const scene = new THREE.Scene(),
	playerHeight = 1.8,

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ),
	camBox = new THREE.Group()

// camera.position.z = 0.3
// camera.position.y = 0.8
camera.position.z = 10
camera.position.y = 10
// camera.position.y = playerHeight
camBox.name = 'camBox'

camBox.add( camera )
scene.add( camBox )

const renderer = new THREE.WebGLRenderer( { antialias: true } )
renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setPixelRatio( window.devicePixelRatio )
document.body.appendChild( renderer.domElement )

// window.addEventListener( 'click', clickOnElement )
window.addEventListener( 'resize', resize )

const controls = new THREE.OrbitControls( camera, renderer.domElement )
controls.enableZoom = true

const hemisphereLight = new THREE.HemisphereLight( 0xeeeeee, 0x080820, 1 )
scene.add( hemisphereLight )

const raycaster = 	new THREE.Raycaster(),
	mouse = 		new THREE.Vector2()

window.addEventListener( 'mousemove', onMouseMove, false )

function onMouseMove( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1

	// console.log( mouse )

}

const tempTrees = []

function clickOnElement() {

	raycaster.setFromCamera( mouse, camera )

	const intersects = raycaster.intersectObjects( scene.children, true )

	if ( intersects.length !== 0 ) {

		setTree( tree, intersects[ 0 ].point )
		tempTrees.push( intersects[ 0 ].point )
		console.log( JSON.stringify( tempTrees ) )

	}

}

function resize() {

	renderer.setSize( window.innerWidth, window.innerHeight )
	renderer.setPixelRatio( window.devicePixelRatio )

}

export {
	scene,
	camera,
	camBox,
	renderer,
	controls,
	playerHeight,
	raycaster,
	mouse
}