import {
	scene,
	camera,
	renderer
} from './_base'
import {
	controller1,
	controller2
} from './controls'

function animate() {

	renderer.animate( loop )

}

function loop() {

	controller1.update()
	controller2.update()

	renderer.render( scene, camera )

}

export default animate