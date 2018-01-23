import { scene } from './_base'
import polyOBJLoader from './polyOBJLoader'

let mountain

function setMountain() {

	polyOBJLoader( 'build/objects/mountain/' )
		.then( object => {

			object.receiveShadow = true

			object.scale.set( 250, 250, 250 )
			object.position.x = -40
			object.position.y = 70
			object.position.z = -300
			object.rotateY( ( Math.PI / 180 ) * 90 )

			object.name = 'mountain'

			object.matrixWorldNeedsUpdate = true

			mountain = object.clone()

			scene.add( mountain )

		} )
		.catch( err => {

			console.log( err )

		} )

}

export default setMountain
export {
	mountain
}