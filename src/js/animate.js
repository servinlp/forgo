import {
	scene,
	camera,
	renderer
} from './_base'

function animate() {

	renderer.animate( loop )

}

function loop() {

	renderer.render( scene, camera )

}

export default animate