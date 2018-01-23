import { scene } from './_base'

function setSkybox() {

	const r = 'build/images/skybox',
		urls = [
			`${r}/px.png`, `${r}/nx.png`,
			`${r}/py.png`, `${r}/ny.png`,
			`${r}/pz.png`, `${r}/nz.png`
		],
		textureCube = new THREE.CubeTextureLoader().load( urls )

	textureCube.mapping = THREE.CubeRefractionMapping

	console.log( r )
	console.log( textureCube )

	scene.background = textureCube

}

export default setSkybox