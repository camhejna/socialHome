/**
 * @author Cameron Hejna
 **/

var THREE = require('three');
var Detector = require('./Detector.js');
 
 /*---CHECKS---*/
//webGL check
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

/*---VARS---*/
//basics
var container, scene, camera, renderer;
var light, time, mouse, raycaster;
var loader;

//util
var twitter, tMap, tMat, instagram, iMap, iMat, facebook, fMap, fMat, soundcloud, sMap, sMat, spotify, spMap, spMat, social;

/*---FUNCTIONS---*/
function init(){
	container = document.getElementById( 'container' );
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	light = new THREE.PointLight( 0xffffff, 1, 0, 2);
	light.position.set( 0, 500, 100);
	scene.add( light );
	
	time = 0.0;
	
	mouse = new THREE.Vector2();
	
	raycaster = new THREE.Raycaster();
	
	loader = new THREE.TextureLoader();
	loader.setPath( './textures/' );
	
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
	document.addEventListener( "mousedown", onMouseDown, false );
	document.addEventListener( "touchend", onTouch, false );
	document.addEventListener( "touchmove", onTouchMove, false );
	
	render();
}

/*---EVENT HANDLERS---*/
function onWindowResize(event){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onMouseMove( event ){
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onMouseDown( event ){
	event.preventDefault();	
	var intersects = raycaster.intersectObjects( scene.children );
	if( intersects.length > 0 ){
		window.open(intersects[0].object.userData.URL);
	}
}

function onTouch( event ){
	onMouseDown(event);
}

function onTouchMove( event ){
	onMouseMove( event );
}

/*---SCENE HANDLERS---*/
function handleMovement(){
	camera.position.x = (15 * Math.cos( time / 450 ));
	camera.position.y = (15 * Math.sin( time / 450 ));
	camera.position.z = (15 * Math.sin( time / 450 ));

	camera.lookAt( ( new THREE.Vector3( 0, 0, 0 ) ) );
}

function handleRay(){
	raycaster.setFromCamera( mouse, camera );
}

/*---RENDER---*/
function render(){
	requestAnimationFrame( render );
	renderer.render( scene, camera );
	
	handleMovement();
	handleRay();
	
	time++;
}

/*---RUN---*/
init();

/*---EOF---*/