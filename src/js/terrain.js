/* global THREE */
import { scene } from './_base'
import polyOBJLoader from './polyOBJLoader'

let terrain

function setTerrain() {

	polyOBJLoader( 'build/objects/terrain/' )
		.then( object => {

			object.scale.set( 40, 40, 40 )
			object.position.x = 100
			object.position.y = -44.5

			terrain = object.clone()

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