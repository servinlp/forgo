/* global THREE */
import { scene } from './_base'
import polyOBJLoader from './polyOBJLoader'
import trees from './allTrees'

let tree

function setTrees() {

	polyOBJLoader( 'build/objects/tree/' )
		.then( object => {

			tree = object.clone()
			console.log( tree )

			trees.forEach( el => {

				setTree( object, el )

			} )

		} )
		.catch( err => {

			console.log( err )

		} )

}

function setTree( obj, el ) {

	const currentTree = obj.clone(),
		size = new THREE.Box3().setFromObject( currentTree ),
		scale = 2 - ( Math.random() * 0.4 )

	console.log( size )

	currentTree.position.x = el.x
	currentTree.position.y = el.y + ( size.max.y * 3 )
	currentTree.position.z = el.z

	currentTree.rotateY( ( Math.PI / 180 ) * ( Math.random() * 360 ) )

	currentTree.scale.set( scale, scale, scale )

	currentTree.name = 'tree'

	scene.add( currentTree )

}

export default setTrees

export {
	tree,
	setTree
}