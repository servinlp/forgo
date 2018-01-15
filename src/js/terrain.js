/* global THREE */
import { scene } from './_base'
import polyOBJLoader from './polyOBJLoader'

let terrain,
	waterBox

function setTerrain() {

	polyOBJLoader( 'build/objects/terrain/' )
		.then( object => {

			object.receiveShadow = true
			object.castShadow = true

			object.scale.set( 40, 40, 40 )
			object.position.y = -1.61
			object.position.z = 25

			terrain = object.clone()

			terrain.name = 'terrain'

			terrain.children[ 0 ].receiveShadow = true
			terrain.children[ 0 ].castShadow = true

			scene.add( terrain )

		} )
		.catch( err => {

			console.log( err )

		} )

	const waterBoxGeometry = new THREE.BoxGeometry( 100, 1, 1 ),
		waterBoxMaterial = new THREE.MeshBasicMaterial( {
			transparent: true,
			opacity: 1,
			wireframe: true
		} )

	waterBox = new THREE.Mesh( waterBoxGeometry, waterBoxMaterial )

	waterBox.position.z -= 10

	scene.add( waterBox )

}

export default setTerrain
export {
	terrain,
	waterBox
}