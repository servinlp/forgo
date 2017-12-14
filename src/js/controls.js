/* global THREE */
import { scene, renderer, playerHeight, camBox } from './_base'

const controller1 = new THREE.ViveController( 0 ),
	controller2 = new THREE.ViveController( 1 )

function setControllers() {

	camBox.add( controller1 )
	camBox.add( controller2 )

	const loader = new THREE.OBJLoader()
	loader.setPath( 'build/objects/controller/' )
	loader.load( 'vr_controller_vive.obj', object => {

		// console.log( object )

		const textureLoader = new THREE.TextureLoader()
		textureLoader.setPath( 'build/objects/controller/' )

		const controller = object.children[ 0 ]
		controller.material.map = textureLoader.load( 'onepointfive_texture.png' )
		controller.material.specularMap = textureLoader.load( 'onepointfive_spec.png' )

		controller1.add( object.clone() )
		controller2.add( object.clone() )

	}, () => {

		// On Progress

	}, err => {

		console.log( err )

	} )

}

export {
	setControllers,
	controller1,
	controller2
}