/* global THREE */
import { scene } from './_base'
import polyOBJLoader from './polyOBJLoader'
import trees from './allTrees'

let tree

function setTrees() {

	polyOBJLoader( 'build/objects/tree/' )
		.then( object => {

			tree = object.clone()

			tree.name = 'tree'

			tree.castShadow = true
			tree.receiveShadow = true
			tree.children[ 0 ].receiveShadow = true
			tree.children[ 0 ].castShadow = true

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

	currentTree.position.x = el.x
	currentTree.position.y = el.y + ( size.max.y * 3 ) + ( 80 - 1.61 )
	currentTree.position.z = el.z + 106

	currentTree.rotateY( ( Math.PI / 180 ) * ( Math.random() * 360 ) )

	currentTree.scale.set( scale, scale, scale )

	currentTree.name = 'tree'

	currentTree.castShadow = true
	currentTree.receiveShadow = true
	currentTree.children[ 0 ].receiveShadow = true
	currentTree.children[ 0 ].castShadow = true
	currentTree.children[ 0 ].material[ 0 ].flatShading = true
	currentTree.children[ 0 ].material[ 1 ].flatShading = true

	scene.add( currentTree )

}

export default setTrees

export {
	tree,
	setTree
}