import { scene } from './_base'
import polyOBJLoader from './polyOBJLoader'

function setCamp() {

	polyOBJLoader( 'build/objects/tent/' )
		.then( object => {

			object.receiveShadow = true
			object.castShadow = true

			object.children[ 0 ].receiveShadow = true
			object.children[ 0 ].castShadow = true

			object.scale.set( 20, 20, 20 )
			object.position.x = -5
			object.position.y = -0.1
			object.position.z = 1
			object.rotateX( ( ( Math.PI / 180 ) * 90 ) )
			object.rotateY( -( ( Math.PI / 180 ) * 100 ) )
			object.rotateZ( ( ( Math.PI / 180 ) * 90 ) )

			const tent = object.clone()

			tent.name = 'tent'

			console.log( tent )

			scene.add( tent )

		} )
		.catch( err => {

			console.log( err )

		} )

}

export default setCamp