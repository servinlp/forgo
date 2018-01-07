/* global THREE */

function polyOBJLoader( path ) {

	return new Promise( ( resolve, reject ) => {

		const MTLLoader = new THREE.MTLLoader()
		MTLLoader.setPath( path )
		MTLLoader.load( 'materials.mtl', materials => {

			materials.preload()

			const OBJLoader = new THREE.OBJLoader()

			OBJLoader.setMaterials( materials )
			OBJLoader.setPath( path )

			OBJLoader.load( 'model.obj', object => {

				resolve( object )

			}, () => {

				// On Progress

			}, err => {

				reject( err )

			} )

		}, () => {

			// On Progress

		}, err => {

			reject( err )

		} )

	})

}

export default polyOBJLoader