var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

var scene = new THREE.Scene();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClear = false;
renderer.setClearColor(0xffffff, 0.0);

$('#editor').append(renderer.domElement);

// camera
camera.position.z = 15;
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

var clock = new THREE.Clock();

// orbit, pan, zoom controls
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.autoRotate = true;
controls.addEventListener('change', function() {
    return render;
});

// lightning
directionalLight = new THREE.DirectionalLight(0xffaa44, 0.6, 100);
directionalLight.position.set(10, 5, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

light = new THREE.AmbientLight(0xffffff, 1.2);
light.position.set(5, 1, 1);
light.castShadow = true;
scene.add(light);

this.onWindowResize = function(event) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.fov = (360 / Math.PI) * Math.atan(tanFOV * (window.innerHeight / windowHeight));
  camera.updateProjectionMatrix();
  camera.lookAt(scene.position);
  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer.render(scene, camera);
};

this.onMouseMove = function(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  return mouse.y = -(event.clientY / window.innerHeight) * 2 + 1.15;
};

var render = function() {
    requestAnimationFrame(render);
    var delta = clock.getDelta();
    controls.update(delta);
    renderer.render(scene, camera);
};

render();

loader = new THREE.PLYLoader();
loader.load( './models/Lucy100k.ply', function ( geometry ) {

    geometry.computeVertexNormals();

    var material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
    var mesh = new THREE.Mesh( geometry, material );

    mesh.scale.multiplyScalar( 0.01 );
    mesh.rotation.y += Math.PI;

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add( mesh );
} );
