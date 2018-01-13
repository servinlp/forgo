import { scene } from './_base'
import polyOBJLoader from './polyOBJLoader'

let cliff

function setCliff() {

	polyOBJLoader( 'build/objects/cliff/' )
		.then( object => {

			object.receiveShadow = true

			object.scale.set( 100, 100, 100 )
			object.position.x = -9
			object.position.y = -10
			// object.position.z = 61
			object.position.z = 100
			object.rotateY( 0.55 )

			object.name = 'cliff'

			object.matrixWorldNeedsUpdate = true

			cliff = object.clone()

			scene.add( cliff )

		} )
		.catch( err => {

			console.log( err )

		} )

}

export default setCliff
export {
	cliff
}