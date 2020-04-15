import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setCameraToBoundingBox } from '@bit/benolayinka.benolayinka.utils'
import ThreeSceneRenderer from '@bit/benolayinka.benolayinka.three-scene-renderer'
import BasicSceneBuilder from '@bit/benolayinka.benolayinka.basic-scene-builder'

function App() {

  	var canvas, renderer, scene, camera, clock, mixer, controls

  	function extendScene(props){
		({canvas, renderer, scene, camera, controls} = props)

		clock = new THREE.Clock()

	  	scene.background = new THREE.Color('red');

	  	let loader = new GLTFLoader()
	  	loader.load('assets/coach-samba.glb', (gltf)=>{
			mixer = new THREE.AnimationMixer( gltf.scene );
	 		var action = mixer.clipAction( gltf.animations[ 0 ] );
	  		action.play();
			scene.add(gltf.scene)
			setCameraToBoundingBox(camera, gltf.scene)
	  	})

	  	let spotLight = new THREE.SpotLight(0xffffff, 0.25)
	  	spotLight.position.set(45, 50, 15);
	  	scene.add(spotLight);

	  	let ambLight = new THREE.AmbientLight(0xffffff);
	  	ambLight.position.set(5, 3, 5);
	  	scene.add(ambLight);

	  	animate()
  	}

  	function animate(){
		var delta = clock.getDelta();

		if(mixer){
	  		mixer.update(delta)
		}

		requestAnimationFrame(animate)
  	}

  	const sb = new BasicSceneBuilder({onBuild: extendScene})

	return (
		<div className="App">
			<ThreeSceneRenderer 
				className='h-100 w-100 position-absolute' 
				adaptToDeviceRatio 
				gammaCorrect
				onMount={sb.buildScene}
				onUnmount={sb.destroyScene}
			/>
		</div>
	);
}

export default App;
