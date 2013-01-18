(function() {

    var width = window.innerWidth;
    var height = window.innerHeight;

    // Create a WebGL renderer
    var renderer = new THREE.WebGLRenderer();

    renderer.setSize( width, height );

    // Add generated <canvas> to page
    var container = document.getElementById('container');
    container.appendChild( renderer.domElement );

    // Make a scene
    var scene = new THREE.Scene();

    // Create a camera
    var camera = new THREE.PerspectiveCamera(
            45,           // Field of View
            width/height, // Aspect ratio
            1,            // zNear
            10000         // zFar
    );

    camera.position.y = 100;
    camera.position.z = 200;

    // Add it to the scene
    scene.add( camera );

    var controls = new THREE.FlyControls(camera);

    controls.movementSpeed = 30;
    controls.rollSpeed = 0.1;
    controls.dragToLook = true;

    camera.lookAt(new THREE.Vector3(0,0,0));

    var clock = new THREE.Clock();

    // Make a cube
    var cube = new THREE.Mesh(
            new THREE.CubeGeometry( 50, 50, 50 ),
            new THREE.MeshLambertMaterial( {
                map: THREE.ImageUtils.loadTexture('img/graphite.png'),
                emissive: 0x111111} ));

    cube.rotation.y = Math.PI / 4;

    // Add it to the scene
    scene.add( cube );

    var smallCube1 = new THREE.Mesh(
            new THREE.CubeGeometry( 10, 10, 10 ),
            new THREE.MeshLambertMaterial( {
                map: THREE.ImageUtils.loadTexture('img/graphite.png'),
                emissive: 0x111111} ));

    smallCube1.position.set(60, 60, 0);
    smallCube1.rotation.y = Math.PI / 4;

    scene.add(smallCube1);


    // Walls

    var wallGeometry = new THREE.PlaneGeometry(100, 100);
    var wallMaterial = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('img/graphite.png'), emissive: 0x111111,
        side: THREE.DoubleSide});

    var wallLeft = new THREE.Mesh(wallGeometry, wallMaterial);
    wallLeft.position.x = -50 * Math.cos(Math.PI / 4);
    wallLeft.position.y = 25;
    wallLeft.rotation.y = Math.PI / 4;

    scene.add( wallLeft );

    var wallBottom = new THREE.Mesh(wallGeometry, wallMaterial);
    wallBottom.position.y = -25;
    wallBottom.position.z = 50 * Math.cos(Math.PI / 4);
    wallBottom.rotation.z = Math.PI / 4;
    wallBottom.rotation.x = -Math.PI / 2;

    scene.add( wallBottom );

    var wallBack = new THREE.Mesh(wallGeometry, wallMaterial);
    wallBack.position.x = 50 * Math.cos(Math.PI / 4);
    wallBack.position.y = 25;
    wallBack.rotation.y = -Math.PI / 4;


    scene.add( wallBack );


    // Lights
    var ambientLight = new THREE.AmbientLight( 0x333333 );
    scene.add( ambientLight );

    // Spotlight

    // Color, intensity, distance...
    var spotLight1 = new THREE.SpotLight(0xFFFFFF, 1.0, 400);
    var spotLight2 = new THREE.SpotLight(0xFFFFFF, 1.0, 400);

    spotLight1.position.set( 50, 50, 300 ); // x, y, z
    spotLight1.target.position.set( 0, 0, 0 );

    spotLight2.position.set( 0, 300, 0 ); // x, y, z
    spotLight2.target.position.set( 0, 0, 0 );

    scene.add( spotLight1 );
    scene.add( spotLight2 );

    // Make it spin
    function animate() {

        // Angles are in radians
        //cube.rotation.y += 0.1;

        controls.update(clock.getDelta());

        // Re-render
        renderer.render(scene, camera);

        // Call animate again once browser's ready for next frame
        requestAnimationFrame( animate )

    }

    // Start animation going
    animate();

})();