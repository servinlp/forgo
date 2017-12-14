/* global THREE */
import animate from './animate'
import WEBVR from './WebVR'
import { scene, renderer, camBox, playerHeight } from './_base'
import { setControllers } from './controls'

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

				camBox.position.y = playerHeight
				renderer.vr.enabled = true
				renderer.vr.setDevice( display )

				setControllers()

				document.body.appendChild( WEBVR.getButton( display, renderer.domElement ) )

			} )

		} )
		.catch( message => {

			console.log( message )

		} )

	animate()

}

export default init