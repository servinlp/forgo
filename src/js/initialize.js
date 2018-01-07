/* global THREE */
import animate from './animate'
import WEBVR from './WebVR'
import { scene, renderer, camBox, playerHeight } from './_base'
import { setControllers } from './controls'
import setCliff from './cliff'
import setTerrain from './terrain'
import setTrees, { tree } from './tree'

function init() {

	// const planeGeometry = new THREE.PlaneGeometry( 20, 20 ),
	// 	planeMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } ),
	// 	plane = new THREE.Mesh( planeGeometry, planeMaterial )
	// plane.name = 'footing'
    //
	// plane.rotateX( ( Math.PI / 180 ) * -90 )
    //
	// scene.add( plane )

	// const axesHelper = new THREE.AxesHelper( 5 )
	// scene.add( axesHelper )

	setCliff()
	setTerrain()
	setTrees()

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

			const leftMtlLoader = new THREE.MTLLoader()
			leftMtlLoader.setPath( 'build/objects/left-hand/' )
			leftMtlLoader.load( 'materials.mtl', materials => {

				materials.preload()

				const objLoader = new THREE.OBJLoader()

				objLoader.setMaterials( materials )
				objLoader.setPath( 'build/objects/left-hand/' )

				objLoader.load( 'model.obj', object => {

					object.children[ 0 ].material.color.set( new THREE.Color( 0xffffff ) )
					object.scale.set( 0.4, 0.4, 0.4 )
					// object.rotation.y += ( Math.PI / 180 ) * 70
					object.position.y = 0.5
					object.position.z += 0.183

					scene.add( object.clone() )

				}, () => {

					// On Progress

				}, err => {

					console.log( err )

				} )

			}, () => {

				// On Progress

			}, err => {

				console.log( err )

			} )

		} )

	animate()

}

export default init