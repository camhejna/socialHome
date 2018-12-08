/**
 * @author Cameron Hejna
 **/

var THREE = require('three');
//import Detector from 'Detector.js'
import $ from 'jquery'

// function component() {
// 	let element = document.createElement('div');
	
//     return element;
// }

 
 /*---CHECKS---*/
//webGL check
//if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

/*---DECLARATIONS---*/
//basics
var container, scene, camera, renderer;
var light, time, mouse, raycaster;
var loader;

//util
var twitter, tMap, tMat, instagram, iMap, iMat, facebook, fMap, fMat, soundcloud, sMap, sMat, spotify, spMap, spMat, social;
//var constructionBanner; //this will be a warning banner displayed on incomplete pages & areas of the site.
//is there a way to determine SOCIAL_COUNT based on computer specs?

/*---FUNCTIONS---*/

function init(){
	//basics
	container = document.getElementById( 'container' );
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
	//camera.position.set( 15, 15, 15 );
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	
	console.log(renderer);

	//append scene to the page
	//document.body.appendChild( component() );
	//component().appendChild(renderer.domElement);
	

	console.log(container);

	container.appendChild( renderer.domElement );

	//global light
	light = new THREE.PointLight( 0xffffff, 1, 0, 2);
	light.position.set( 0, 500, 100);
	scene.add( light );
	
	//time
	time = 0.0;
	
	//mouse
	mouse = new THREE.Vector2();
	
	//raycaster
	raycaster = new THREE.Raycaster();
	
	//loader
	loader = new THREE.TextureLoader();
	loader.setPath( './textures/' );
	
	//util
	twitter = [];
	tMap = loader.load( 'tweet.png');
	tMat = new THREE.SpriteMaterial( { map: tMap, color: 0xffffff } );
	for( var i = 0; i < 25; i++ ){
		twitter[i] = new THREE.Sprite( tMat );
		twitter[i].userData = { URL: "https://www.twitter.com/hejnac" };
		twitter[i].position.set( 20 * Math.random() - 10, 20 * Math.random() - 10, 20 * Math.random() - 10);
		scene.add(twitter[i]);
	}
	
	instagram = [];
	iMap = loader.load( 'insta.png');
	iMat = new THREE.SpriteMaterial( { map: iMap, color: 0xffffff } );
	for( var j = 0; j < 25; j++ ){
		instagram[j] = new THREE.Sprite( iMat );
		instagram[j].userData = { URL: "https://www.instagram.com/camhejna/" };
		instagram[j].position.set( 20 * Math.random() - 10, 20 * Math.random() - 10, 20 * Math.random() - 10);
		scene.add(instagram[j]);
	}
	
	facebook = [];
	fMap = loader.load( 'post.png');
	fMat = new THREE.SpriteMaterial( { map: fMap, color: 0xffffff } );
	for( var k = 0; k < 25; k++ ){
		facebook[k] = new THREE.Sprite( fMat );
		facebook[k].userData = { URL: "https://www.facebook.com/ss16radio/" };
		facebook[k].position.set( 20 * Math.random() - 10, 20 * Math.random() - 10, 20 * Math.random() - 10);
		scene.add(facebook[k]);
	}
	
	soundcloud = [];
	sMap = loader.load( 'soundcloud.png' );
	sMat = new THREE.SpriteMaterial( { map: sMap, color: 0xffffff } );
	for( var l = 0; l < 25; l++ ){
		soundcloud[l] = new THREE.Sprite( sMat );
		soundcloud[l].userData = { URL: "https://soundcloud.com/camhejna" };
		soundcloud[l].position.set( 20 * Math.random() - 10, 20 * Math.random() - 10, 20 * Math.random() - 10 );
		scene.add(soundcloud[l]);
	}
	
	spotify = [];
	spMap = loader.load( 'spotify.png' );
	spMat = new THREE.SpriteMaterial( { map: spMap, color: 0xffffff } );
	for( var m = 0; m < 10; m++){
		spotify[m] = new THREE.Sprite( spMat );
		spotify[m].userData = { URL: "https://open.spotify.com/artist/3Qout2kHVaWp3H4vjBLglb?si=RWbyoSEdQSiwbeb_eY0Hnw" };
		spotify[m].position.set( 20 * Math.random() - 10, 20 * Math.random() - 10, 20 * Math.random() - 10 );
		scene.add(spotify[m]);
	}
	
	window.addEventListener( "resize", onWindowResize, false );
	document.addEventListener( "mousemove", onMouseMove, false );
	//document.addEventListener( "mouseover", onMouseOver, false );
	document.addEventListener( "mousedown", onMouseDown, false );
	//document.addEventListener( "mouseup", onMouseUp, false );
	document.addEventListener( "touchend", onTouch, false );
	document.addEventListener( "touchmove", onTouchMove, false );
	
	render();
}

//

function onWindowResize(event){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onMouseMove( event ){
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onMouseDown( event ){
	event.preventDefault();
	
	
	var intersects = raycaster.intersectObjects( scene.children );
	if( intersects.length > 0 ){
		window.open(intersects[0].object.userData.URL);
	}
	
	//console.log(intersects);
}

function onTouch( event ){
	onMouseDown(event);
}

function onTouchMove( event ){
	onMouseMove( event );
}

//

function handleMovement(){
	camera.position.x = (15 * Math.cos( time / 450 ));
	camera.position.y = (15 * Math.sin( time / 450 ));
	camera.position.z = (15 * Math.sin( time / 450 ));
	

	
	camera.lookAt( ( new THREE.Vector3( 0, 0, 0 ) ) );
}

function handleRay(){
	raycaster.setFromCamera( mouse, camera );
}

function handleText(){
	//$('div.info').append('.');
}

//

function render(){
	requestAnimationFrame( render );
	renderer.render( scene, camera );
	
	//handlers
	handleMovement();
	handleRay();
	handleText();
	
	time++;
}

/*---RUN---*/
console.log("init() call next...");
init();
/*---EOF---*/