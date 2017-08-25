
// TRABALHO FINAL NAVE - COMPUTAÇÃO GRAFICA
// GRUPO: MARTIM RUBINO, EDUARDO SALVATORE


// Universo
var scene = new THREE.Scene();

var nave;
var level;
var target;
var enemyA;
var enemyB;
var enemyC;
var n;
var vel;

var city;

var display = document.querySelector("#distancia");
var distdisplay = 0;
var count = 0;

var m = {};

var rotate = 0;

var a = 0;

var distA, distB, distC;

// limite é a distancia necessaria para verificar a colisao
var limite = 33;

//Camera = projection + view
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Renderer = GL + canvas
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Pontos do cubo
var geometry = new THREE.SphereGeometry( 1, 10, 10 );

// Shaders
var material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
var material2 = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
var material3 = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
var material4 = new THREE.MeshLambertMaterial( { color: 0x000000 } );
var material5 = new THREE.MeshLambertMaterial( { color: 0xffffff } );

// Mistura desenho + shader
var cube = new THREE.Mesh( geometry, material );

//Luzes
var dLight = new THREE.DirectionalLight( 0xffdd00, 0.5 );
dLight.position.z = 5;
dLight.position.x = 5;
scene.add( dLight );

var light = new THREE.AmbientLight( 0x400030 ); // soft white light
scene.add( light );

// Posicionar a camera
camera.position.z = -11;
camera.lookAt(new THREE.Vector3(0,0,0))
camera.position.y = 3;
camera.lookAt(new THREE.Vector3(0,0,0))

//Animar
function render() {
	if(nave){
		// aqui chamo minhas funções de mover nave e camera após meu objeto for importado
		moveNave();
		rotacaoNave()
		movimento(m);
	}
	requestAnimationFrame( render );
  cube.rotateY(1/60);
  cube.rotateZ(1/60);
	// chamando minha função que move a nave
	if(level){
		posicaoLevel();
	}

	if(target){
		moveCamera();
	}

	if(enemyA && enemyB && enemyC){
		posicaoInimigos();
		calculaDistancia();
		verificaColisao();
	}

	if(city){
		city.rotateY(2/200);
	}

	renderer.render( scene, camera );
}
render();

// instantiate a loader
		var loader = new THREE.OBJLoader();
		var loader2 = new THREE.OBJLoader();
		var loader3 = new THREE.OBJLoader();

		var loaderA = new THREE.OBJLoader();
		var loaderB = new THREE.OBJLoader();
		var loaderC = new THREE.OBJLoader();

		var loadercity = new THREE.OBJLoader();

		// carregando minha nave
		loader.load(
			// resource URL
			'navemodel.obj',
			// Function when resource is loaded
			function ( object ) {
				nave = object;
				nave.position.x = 0;
				nave.position.y = 20;
				nave.position.z = 0;
				nave.children[0].material.shading = THREE.SmoothShading;
				scene.add( object );
				nave.children[0].geometry.center()
			}
		);

		// carregando meu level
		loader2.load(
			// resource URL
			'level.obj',
			// Function when resource is loaded
			function ( object ) {
				level = object;
				level.scale.z = 1.5;
				level.position.x = 0;
				level.position.y = 0;
				level.position.z = 1100;
				level.rotateY(1.5710);
				level.children[0].material=material2;
				scene.add( object );
				level.children[0].geometry.center()
			}
		);

		//este target sera o alvo para qual minha camera ficara apontada
		loader3.load(
			// resource URL
			'enemy.obj',
			// Function when resource is loaded
			function ( object ) {
				target = object;
				// deifinindo a posicao do meu target
				target.position.y = -30;
				target.children[0].material=material5;
				scene.add( object );
				target.children[0].geometry.center()
			}
		);

		// agora importarei meus inimigos
		// inimigo A
		loaderA.load(
			// resource URL
			'enemy.obj',
			// Function when resource is loaded
			function ( object ) {
				enemyA = object;
				enemyA.scale.x = 2;
				enemyA.scale.y = 2;
				enemyA.scale.z = 2;
				enemyA.position.z = Math.floor((Math.random() * 100) + 150);
				enemyA.position.x = Math.floor((Math.random() * 70) + -35);
				enemyA.position.y = 0;
				// deifinindo a posicao do meu target
				enemyA.position.y = -10;
				enemyA.children[0].material=material3;
				scene.add( object );
				enemyA.children[0].geometry.center()
			}
		);
		// inimigo B
		loaderB.load(
			// resource URL
			'enemy.obj',
			// Function when resource is loaded
			function ( object ) {
				enemyB = object;
				enemyB.scale.x = 2;
				enemyB.scale.y = 2;
				enemyB.scale.z = 2;
				enemyB.position.z = Math.floor((Math.random() * 100) + 150);
				enemyB.position.x = Math.floor((Math.random() *70) + -35);
				enemyB.position.y = 0;
				// deifinindo a posicao do meu target
				enemyB.position.y = -10;
				enemyB.children[0].material=material3;
				scene.add( object );
				enemyB.children[0].geometry.center()
			}
		);
		// inimigo C
		loaderC.load(
			// resource URL
			'enemy.obj',
			// Function when resource is loaded
			function ( object ) {
				enemyC = object;
				enemyC.scale.x = 2;
				enemyC.scale.y = 2;
				enemyC.scale.z = 2;
				enemyC.position.z = Math.floor((Math.random() * 100) + 150);
				enemyC.position.x = Math.floor((Math.random() * 70) + -35);
				enemyC.position.y = 0;
				// deifinindo a posicao do meu target
				enemyC.position.y = -10;
				enemyC.children[0].material=material3;
				scene.add( object );
				enemyC.children[0].geometry.center()
			}
		);

		// importando o objeto da minha cidade
		loadercity.load(
			// resource URL
			'city.obj',
			// Function when resource is loaded
			function ( object ) {
				city = object;
				city.scale.x = 4;
				city.scale.z = 4;
				city.scale.y = 2;
				city.position.z = Math.floor((Math.random() * 100) + 150);
				city.position.x = Math.floor((Math.random() * 70) + -35);
				city.position.y = 0;
				// deifinindo a posicao do meu target
				city.position.y = -200;
				city.position.z = 70;
				city.position.x = 0;
				city.children[0].material=material5;
				scene.add( object );
				city.children[0].geometry.center()
			}
		);

function moveCamera(){
	camera.position.x = target.position.x;
	camera.position.z = target.position.z-0.1;
	camera.position.y = target.position.y + 100;
	camera.lookAt(target.position);

}

function moveNave(){

	if(nave.position.x > 35){
		nave.position.x = 34;
	}
	if(nave.position.x < -35){
		nave.position.x = -34;
	}
	if(nave.position.z > 30){
		nave.position.z = 29;
	}
	if(nave.position.z < -30){
		nave.position.z = -29;
	}
	count++;
	distdisplay+=0.5;
	if(count%10==0){
		display.textContent=`distancia:${distdisplay} km`;
	}

}

function rotacaoNave(){
	nave.rotation.z = rotate * Math.PI*.25;
	var dir = Math.sign(rotate);
	rotate += -dir * 1/30;
}

function posicaoLevel(){
		level.position.z -= 6.5;

		if(level.position.z < -1000){
			level.position.z = 1100;
		}

}

function posicaoInimigos(){
	enemyA.position.z -=2.5;
	enemyB.position.z -=2.5;
	enemyC.position.z -=2.5;

	if(enemyA.position.z< -50){
		enemyA.position.z = Math.floor((Math.random() * 100) + 90);
		enemyA.position.x = Math.floor((Math.random() * 70) + -35);
	}
	if(enemyB.position.z< -50){
		enemyB.position.z = Math.floor((Math.random() * 100) + 90);
		enemyB.position.x = Math.floor((Math.random() * 70) + -35);
	}
	if(enemyC.position.z< -50){
		enemyC.position.z = Math.floor((Math.random() * 100) + 90);
		enemyC.position.x = Math.floor((Math.random() * 70) + -35);
	}
}

function verificaColisao(){
	if(distA < limite){
		console.log("colidiu com A");
		distdisplay = 0;
	}
	if(distB < limite){
		console.log("colidiu com B");
		distdisplay = 0;
	}
	if(distC < limite){
		console.log("colidiu com C");
		distdisplay = 0;
	}
}

// funcao faz minha nave andar em direções
function movimento(event) {
    var keyCode = event.key;
    if (keyCode == "ArrowUp") {
        nave.position.z += 2;
    } else if (keyCode == "ArrowDown") {
        nave.position.z -= 2;
    } else if (keyCode == "ArrowRight") {
        nave.position.x -= 2;
				rotate += 1/5;
    } else if (keyCode == "ArrowLeft") {
        nave.position.x += 2;
				rotate -= 1/5;
		}
		if(rotate < -1){
			rotate = -1;
		}
		if(rotate > 1){
			rotate = 1;
		}
}

function movimentado(evt){
	m = evt;
}

function parar(){
	m = {};
}

// funcao calculara todas as distancia necessarias para colisao
function calculaDistancia(){
		// nave em relação a meu inimigo A
    distA = nave.position.distanceTo(enemyA.position);

		// nave em relação a meu inimigo B
    distB = nave.position.distanceTo(enemyB.position);

		// nave em relação a meu inimigo C
    distB = nave.position.distanceTo(enemyC.position);
}

window.addEventListener("keydown", movimentado);
window.addEventListener("keyup", parar);
