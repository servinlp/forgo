/* global THREE */
import { camera } from './_base'
import { fire } from './fire'
import { waterBox } from './terrain'

function setSounds() {

	const fireListener = new THREE.AudioListener()
	camera.add( fireListener )

	const fireSound = new THREE.PositionalAudio( fireListener ),
		fireAudioLoader = new THREE.AudioLoader()

	fireAudioLoader.load( 'build/sound/fireplace.mp3', buffer => {

		fireSound.setBuffer( buffer )
		fireSound.setRefDistance( 20 )
		fireSound.setLoop( true )
		fireSound.setVolume( 0.5 )
		fireSound.play()

		fire.add( fireSound )

	}, () => {

	}, err => {

		console.log( err )

	} )

	const waterListener = new THREE.AudioListener()
	camera.add( waterListener )

	const waterSound = new THREE.PositionalAudio( waterListener ),
		waterAudioLoader = new THREE.AudioLoader()

	waterAudioLoader.load( 'build/sound/water.mp3', buffer => {

		waterSound.setBuffer( buffer )
		waterSound.setRefDistance( 20 )
		waterSound.setLoop( true )
		waterSound.setVolume( 10 )
		waterSound.play()

		waterBox.add( waterSound )

	}, () => {

	}, err => {

		console.log( err )

	} )

}

export default setSounds