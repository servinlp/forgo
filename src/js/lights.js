/* global THREE */
import { scene, moonPosition } from './_base'
import { moon } from './moon'

let lightOnMoon

function setLights() {

	const pointLight = new THREE.PointLight( 0x367399, 1, 1000 )
	pointLight.position.set( moonPosition.x, moonPosition.y, moonPosition.z )

	const pointLightHelper = new THREE.PointLightHelper( pointLight, 1 )

	scene.add( pointLightHelper )
	scene.add( pointLight )

	// const hemisphereLight = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 )
	// scene.add( hemisphereLight )

	lightOnMoon = new THREE.SpotLight( 0xffffff, 0.7 )

	lightOnMoon.position.set( moonPosition.x - 200, moonPosition.y - 200, moonPosition.z + 200 )
	lightOnMoon.target = moon
	lightOnMoon.castShadow = true
	lightOnMoon.shadow.mapSize.width = 1024
	lightOnMoon.shadow.mapSize.height = 1024
	lightOnMoon.shadow.camera.near = 10
	lightOnMoon.shadow.camera.far = 200

	lightOnMoon.target.updateMatrixWorld()

	scene.add( lightOnMoon )

}

export default setLights
export {
	lightOnMoon
}