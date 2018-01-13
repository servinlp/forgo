/* global THREE */
import { scene, camera, camBox, controls } from './_base'
import polyOBJLoader from './polyOBJLoader'

let terrain

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

}

export default setTerrain
export {
	terrain
}