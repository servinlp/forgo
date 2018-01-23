/* global THREE, TweenMax, Power2 */
import { scene } from './_base'
import polyOBJLoader from './polyOBJLoader'

const fire = new THREE.Object3D()

function setFire() {

	polyOBJLoader( 'build/objects/firewood/' )
		.then( object => {

			const firewood = object.clone()

			firewood.name = 'firewood'

			firewood.receiveShadow = true
			firewood.castShadow = true

			firewood.position.x = -1
			firewood.position.y = -0.3
			firewood.position.z = -0.5

			firewood.children.forEach( el => {

				el.receiveShadow = true
				el.castShadow = true

			} )

			scene.add( firewood )

		} )
		.catch( err => {

			console.log( err )

		} )

	const firePosition = {
			x: -1.01,
			y: -0.3,
			z: -0.5
		},
		flameConeGeometry = new THREE.ConeGeometry( 0.1, 0.5, 5 ),
		flameConematerial = new THREE.MeshBasicMaterial( { color: 0xff3c1f } ),
		flameCone = new THREE.Mesh( flameConeGeometry, flameConematerial ),
		fireLight = new THREE.PointLight( 0xff0000, 0.3, 10 )

	// fireLight.castShadow = true

	fire.position.set( firePosition.x, 0, firePosition.z )

	flameCone.receiveShadow = true
	flameCone.castShadow = true
	flameCone.name = 'flameCone'

	flameCone.add( fireLight )

	const conePositions = [
		{ x: 0, y: 0, z: 0 },
		{ x: 0.07, y: 0, z: 0.07 },
		{ x: 0.07, y: 0, z: 0 },
		{ x: 0, y: 0, z: 0.07 },
		{ x: -0.07, y: 0, z: -0.07 },
		{ x: -0.07, y: 0, z: 0 },
		{ x: 0, y: 0, z: -0.07 }
	]

	conePositions.forEach( position => {

		setFireCone( position, flameCone.clone(), fire )

	} )

	scene.add( fire )

}

function setFireCone( pos, cone, parent ) {

	const down = Math.random() * 0.5,
		timer = ( Math.random() * 1 ) + 0.3

	cone.position.set( pos.x, pos.y - down, pos.z )
	cone.going = 'up'

	TweenMax.to( cone.position, timer, {
		y: 0,
		ease: Power2.easeInOut,
		repeat: -1,
		yoyo: true
	} )

	parent.add( cone )

}

export default setFire
export {
	fire
}