/* global THREE */
import animate from './animate'
import WEBVR from './WebVR'
import { scene, renderer, camBox } from './_base'

function init() {

	const planeGeometry = new THREE.PlaneGeometry( 20, 20 ),
		planeMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } ),
		plane = new THREE.Mesh( planeGeometry, planeMaterial )
	plane.name = 'footing'

	plane.rotateX( ( Math.PI / 180 ) * -90 )

	scene.add( plane )

	const axesHelper = new THREE.AxesHelper( 5 )
	scene.add( axesHelper )

	WEBVR.checkAvailability()
		.then( () => {

			WEBVR.getVRDisplay( display => {

				console.log( display )
				console.log( renderer.vr )
				camBox.position.y = 1.8
				renderer.vr.enabled = true
				renderer.vr.setDevice( display )

				document.body.appendChild( WEBVR.getButton( display, renderer.domElement ) )

			} )

		} )
		.catch( message => {

			console.log( message )

		} )

	animate()

}

export default init