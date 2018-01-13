import { scene } from './_base'
import polyOBJLoader from './polyOBJLoader'

let firewood

function setFire() {

	polyOBJLoader( 'build/objects/firewood/' )
		.then( object => {

			firewood = object.clone()

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

	// const fireSphereGeometry = new THREE.SphereGeometry( 0.2, 21, 21 ),
	// 	fireSphereMaterial = new THREE.MeshBasicMaterial( {color: 0xff3c1f } ),
	// 	fireSphere = new THREE.Mesh( fireSphereGeometry, fireSphereMaterial ),
	const firePosition = {
			x: -1.01,
			y: -0.3,
			z: -0.5
		}
    //
	// fireSphere.position.set( firePosition.x, firePosition.y, firePosition.z )
    //
	// scene.add( fireSphere )
    //
	// const fireLight = new THREE.PointLight( 0xff0000, 1, 100 );
	// fireLight.position.set( firePosition.x, firePosition.y, firePosition.z );
	// scene.add( fireLight )

	const fire = new THREE.Object3D(),
		flameConeGeometry = new THREE.ConeGeometry( 0.1, 0.5, 5 ),
		flameConematerial = new THREE.MeshBasicMaterial( {color: 0xff3c1f } ),
		flameCone = new THREE.Mesh( flameConeGeometry, flameConematerial ),
		fireLight = new THREE.PointLight( 0xff0000, 0.3, 10 )

	fire.position.set( firePosition.x, 0, firePosition.z )

	flameCone.receiveShadow = true
	flameCone.castShadow = true
	flameCone.name = 'flameCone'

	// flameCone.position.set( -0.1, 0, -0.1 )

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

	// console.log( flameCone )

	// const fireLightHelper = new THREE.PointLightHelper( fireLight, 0.1 )
	// scene.add( fireLightHelper )

	// fire.add( flameCone )

	// const secondFlameCone = flameCone.clone()
    //
	// secondFlameCone.position.z -= 0.1
    //
	// console.log( secondFlameCone )
    //
	// fire.add( secondFlameCone )

	scene.add( fire )

}

function setFireCone( pos, cone, fire ) {

	const down = Math.random() * 0.5,
		timer = ( Math.random() * 1 ) + 0.3

	cone.position.set( pos.x, pos.y - down, pos.z )
	cone.going = 'up'

	TweenMax.to( cone.position, timer, { y: 0, ease:Power2.easeInOut,repeat: -1, yoyo: true } )

	fire.add( cone )

}

export default setFire
export {
	firewood
}