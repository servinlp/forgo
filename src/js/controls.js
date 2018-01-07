/* global THREE */
import { camBox } from './_base'

const controller1 = new THREE.ViveController( 0 ),
	controller2 = new THREE.ViveController( 1 )

function setControllers() {

	camBox.add( controller1 )
	camBox.add( controller2 )

	// const loader = new THREE.OBJLoader()
	// loader.setPath( 'build/objects/controller/' )
	// loader.load( 'vr_controller_vive.obj', object => {
	//
	// 	// console.log( object )
	//
	// 	const textureLoader = new THREE.TextureLoader()
	// 	textureLoader.setPath( 'build/objects/controller/' )
	//
	// 	const controller = object.children[ 0 ]
	// 	controller.material.map = textureLoader.load( 'onepointfive_texture.png' )
	// 	controller.material.specularMap = textureLoader.load( 'onepointfive_spec.png' )
	//
	// 	controller1.add( object.clone() )
	// 	controller2.add( object.clone() )
	//
	// }, () => {
	//
	// 	// On Progress
	//
	// }, err => {
	//
	// 	console.log( err )
	//
	// } )

	// const leftHand = new THREE.OBJLoader()
	// leftHand.setPath( 'build/objects/left-hand/' )
	// leftHand.load( 'model.obj', object => {
	//
	// 	console.log( object )
	//
	// 	// console.log( object )
	//
	// 	// const textureLoader = new THREE.TextureLoader()
	// 	// textureLoader.setPath( 'build/objects/controller/' )
	//
	// 	const controller = object.children[ 0 ]
	// 	// controller.material.setColor()
	// 	// controller.material.map = textureLoader.load( 'onepointfive_texture.png' )
	// 	// controller.material.specularMap = textureLoader.load( 'onepointfive_spec.png' )
	//
	// 	controller1.add( object.clone() )
	//
	// }, () => {
	//
	// 	// On Progress
	//
	// }, err => {
	//
	// 	console.log( err )
	//
	// } )

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
			object.rotation.y += ( Math.PI / 180 ) * 70
			object.position.z += 0.183

			controller2.add( object.clone() )

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

	const rightMtlLoader = new THREE.MTLLoader()
	rightMtlLoader.setPath( 'build/objects/right-hand/' )
	rightMtlLoader.load( 'materials.mtl', materials => {

		materials.preload()

		const objLoader = new THREE.OBJLoader()

		objLoader.setMaterials( materials )
		objLoader.setPath( 'build/objects/right-hand/' )

		objLoader.load( 'model.obj', object => {

			object.children[ 0 ].material.color.set( new THREE.Color( 0xffffff ) )
			object.scale.set( 0.78, 0.78, 0.78 )
			object.rotation.y += -( ( Math.PI / 180 ) * 60 )
			object.rotation.z += ( ( Math.PI / 180 ) * 30 )
			object.position.z += 0.18

			controller1.add( object.clone() )

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

}

export {
	setControllers,
	controller1,
	controller2
}