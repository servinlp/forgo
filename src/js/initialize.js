/* global THREE */
import animate from './animate'
import WEBVR from './WebVR'
import { scene, renderer, camBox, playerHeight, fadeBox } from './_base'
import { setControllers } from './controls'
import setMoon from './moon'
import setFire from './fire'
import setCamp from './camp'
import setCliff from './cliff'
import setTrees from './tree'
import setSounds from './sound'
import setSkybox from './skybox'
import setTerrain from './terrain'
import setMountain from './mountain'

let VRDisplay

function init() {

	// const axesHelper = new THREE.AxesHelper( 5 )
	// scene.add( axesHelper )

	setMoon()
	setFire()
	setCamp()
	setCliff()
	setTrees()
	setSounds()
	setSkybox()
	setTerrain()
	setMountain()

	WEBVR.checkAvailability()
		.then( () => {

			WEBVR.getVRDisplay( display => {

				camBox.position.y = playerHeight
				renderer.vr.enabled = true
				renderer.vr.setDevice( display )

				VRDisplay = display

				setControllers()

				document.body.appendChild( WEBVR.getButton( display, renderer.domElement ) )

			} )

		} )
		.catch( message => {

			console.log( message )

			const fadeBoxMaterial = fadeBox.material

			TweenMax.to( fadeBoxMaterial, 2.5, { opacity: 0, delay: 2, ease:Power2.easeInOut } )

		} )

	animate()

}

export default init
export {
	VRDisplay
}