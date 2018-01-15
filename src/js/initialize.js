/* global THREE */
import animate from './animate'
import WEBVR from './WebVR'
import { scene, renderer, camBox, playerHeight } from './_base'
import { setControllers } from './controls'
import setMoon from './moon'
import setFire from './fire'
import setCliff from './cliff'
import setTrees from './tree'
import setSounds from './sound'
import setTerrain from './terrain'
import setMountain from './mountain'

function init() {

	const axesHelper = new THREE.AxesHelper( 5 )
	scene.add( axesHelper )

	setMoon()
	setFire()
	setCliff()
	setTrees()
	setSounds()
	setTerrain()
	setMountain()

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