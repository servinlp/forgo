import { scene, moonPosition } from './_base'
import polyOBJLoader from './polyOBJLoader'
import setLights from './lights'

let moon

function setMoon() {

	polyOBJLoader( 'build/objects/moon/' )
		.then( object => {

			moon = object.clone()

			moon.receiveShadow = true
			moon.castShadow = true

			moon.position.x = moonPosition.x
			moon.position.y = moonPosition.y
			moon.position.z = moonPosition.z

			scene.add( moon )

			setLights()

		} )
		.catch( err => {

			console.log( err )

		} )

}

export default setMoon
export {
	moon
}