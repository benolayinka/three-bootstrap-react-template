import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setContent } from '@bit/benolayinka.benolayinka.utils'
import ThreeSceneRenderer from '@bit/benolayinka.benolayinka.three-scene-renderer'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function App() {

  	var canvas, renderer, scene, camera, clock, mixer, controls

  	function createScene(props){

		({canvas, renderer} = props)

		scene = new THREE.Scene()

		const NEAR = 0.01, FAR = 1000, FOV = 60, ASPECT = 16/9

	  	camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);

	  	controls = new OrbitControls(camera, renderer.domElement);

		clock = new THREE.Clock()

	  	var avatar = new THREE.Object3D()

	  	scene.add(avatar)

	  	let loader = new GLTFLoader()

	  	loader.load('assets/coach-samba.glb', (gltf)=>{

	  		//fix for Box3.setFromObject doesn't calc bounding boxes
	  		gltf.scene.traverse((mesh)=>{

				if(mesh.isSkinnedMesh) {
					const helper = new THREE.BoxHelper(mesh);
					helper.visible = false
					avatar.add(helper)
				}
	  		})

			mixer = new THREE.AnimationMixer( gltf.scene );

	 		var action = mixer.clipAction( gltf.animations[ 0 ] );

	  		action.play();

			scene.add(gltf.scene)

			setContent(avatar, camera, controls)
	  	})

	  	let spotLight = new THREE.SpotLight(0xffffff, 1)
	  	spotLight.position.set(45, 50, 15);
	  	scene.add(spotLight);

	  	let ambLight = new THREE.AmbientLight(0xffffff, 0.5);
	  	ambLight.position.set(5, 3, 5);
	  	scene.add(ambLight);

	  	window.addEventListener('resize', handleWindowResize)

	  	handleWindowResize()

	  	animate()
  	}

  	function handleWindowResize(){
		let width = canvas.clientWidth;
		let height = canvas.clientHeight;
		camera.aspect = width/height;
		camera.updateProjectionMatrix();
	}

  	function animate(){

		var delta = clock.getDelta();

		if(mixer){
	  		mixer.update(delta)
		}

    	controls.update();

		renderer.render(scene, camera)

		requestAnimationFrame(animate)
  	}

	return (
		<div className="App">
			<ThreeSceneRenderer 
				className='h-100 w-100 position-absolute bg-gradient' 
				adaptToDeviceRatio 
				gammaCorrect
				onMount={createScene}
			/>
		</div>
	);
}

export default App;
