(function() {

    var width = window.innerWidth;
    var height = window.innerHeight;

    // Create a WebGL renderer
    var renderer = new THREE.WebGLRenderer({ antialias: true });

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

    camera.position.x = -150;
    camera.position.y = 120;
    camera.position.z = 150;

    // Add it to the scene
    scene.add( camera );

    /*
    var controls = new THREE.FlyControls(camera);

    controls.movementSpeed = 30;
    controls.rollSpeed = 0.1;
    controls.dragToLook = true;
    */

    var controls = new THREE.OrbitControls(camera);
    controls.autoRotate = true;
    controls.autoRotateSpeed = -2.0;

    camera.lookAt(new THREE.Vector3(0,0,0));

    var clock = new THREE.Clock();

    // Make a cube
    var cube = new THREE.Mesh(
            new THREE.CubeGeometry( 50, 50, 50 ),
            new THREE.MeshLambertMaterial( {
                map: THREE.ImageUtils.loadTexture('img/graphite.png'),
                emissive: 0x111111} ));

    cube.position.set(1, 0, 2);
    cube.rotation.y = Math.PI / 4;

    // Add it to the scene
    scene.add( cube );

    var smallCube1 = new THREE.Mesh(
            new THREE.CubeGeometry( 10, 10, 10 ),
            new THREE.MeshLambertMaterial( {
                map: THREE.ImageUtils.loadTexture('img/graphite.png'),
                emissive: 0x111111} ));

    var smallCube1OrigPos = new THREE.Vector3(20, 15, -10);

    smallCube1.position.set( smallCube1OrigPos.x, smallCube1OrigPos.y, smallCube1OrigPos.z );
    smallCube1.rotation.y = Math.PI / 4;

    scene.add(smallCube1);

    var smallCube2 = new THREE.Mesh(
            new THREE.CubeGeometry( 20, 20, 20 ),
            new THREE.MeshLambertMaterial( {
                map: THREE.ImageUtils.loadTexture('img/graphite.png'),
                emissive: 0x111111} ));

    var smallCube2OrigPos = new THREE.Vector3(0, -10, 10);

    smallCube2.position.set( smallCube2OrigPos.x, smallCube2OrigPos.y, smallCube2OrigPos.z );
    smallCube2.rotation.y = Math.PI / 4;

    scene.add(smallCube2);

    var smallCube3 = new THREE.Mesh(
            new THREE.CubeGeometry( 10, 10, 10 ),
            new THREE.MeshLambertMaterial( {
                map: THREE.ImageUtils.loadTexture('img/graphite.png'),
                emissive: 0x111111} ));

    var smallCube3OrigPos = new THREE.Vector3(-20, 15, -10);

    smallCube3.position.set( smallCube3OrigPos.x, smallCube3OrigPos.y, smallCube3OrigPos.z );
    smallCube3.rotation.y = Math.PI / 4;

    scene.add(smallCube3);


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


    // Catalyst 'C'

    var cGeometry = new THREE.CubeGeometry(50, 5, 5);
    var cMaterial = new THREE.MeshLambertMaterial({color: 0x48a85a  , emissive: 0x155228});

    var cBack = new THREE.Mesh(cGeometry, cMaterial);
    cBack.position.x = 25 * Math.cos(Math.PI / 4);
    cBack.position.y = 27.5;
    cBack.position.z = -18 * Math.cos(Math.PI / 4);
    cBack.rotation.y = -Math.PI / 4;

    scene.add( cBack );


    var cTop = new THREE.Mesh(cGeometry, cMaterial);
    cTop.position.x = -22 * Math.cos(Math.PI / 4);
    cTop.position.y = 27.5;
    cTop.position.z = -20 * Math.cos(Math.PI / 4);
    cTop.rotation.y = Math.PI / 4;

    scene.add( cTop );


    var cLeft = new THREE.Mesh(new THREE.CubeGeometry(55, 5, 5), cMaterial);
    cLeft.position.x = -49 * Math.cos(Math.PI / 4);
    cLeft.position.y = 2.5;
    cLeft.position.z = 5;
    cLeft.rotation.y = Math.PI / 4;
    cLeft.rotation.z = Math.PI / 2;

    scene.add( cLeft );


    var cBottom = new THREE.Mesh(cGeometry, cMaterial);
    cBottom.position.x = -22 * Math.cos(Math.PI / 4);
    cBottom.position.y = -22.5;
    cBottom.position.z = 25;
    cBottom.rotation.y = -Math.PI / 4;

    scene.add( cBottom );


    var cRight = new THREE.Mesh(cGeometry, cMaterial);
    cRight.position.x = 27.5 * Math.cos(Math.PI / 4);
    cRight.position.y = -22.5;
    cRight.position.z = 22;
    cRight.rotation.y = Math.PI / 4;

    scene.add( cRight );

    // Lights
    var ambientLight = new THREE.AmbientLight( 0x777777 );
    scene.add( ambientLight );

    // Spotlights

    var spotLight1 = new THREE.SpotLight(0xFFFFFF, 1.0, 400);
    var spotLight2 = new THREE.SpotLight(0xFFFFFF, 1.0, 200);

    spotLight1.position.set( 50, 50, 300 ); // x, y, z
    spotLight1.target.position.set( 0, 0, 0 );

    spotLight2.position.set( 0, 150, 0 ); // x, y, z
    spotLight2.target.position.set( 0, 0, 0 );

    scene.add( spotLight1 );
    scene.add( spotLight2 );


    // Animation

    var cube1Move = new TWEEN.Tween( smallCube1.position )
            .to( { x: 500, y: 500 }, 11000 )
            .easing( TWEEN.Easing.Quadratic.In )
            .onComplete(function() {
                smallCube1.position.set( smallCube1OrigPos.x, smallCube1OrigPos.y, smallCube1OrigPos.z );
            });

    cube1Move.chain( cube1Move );
    cube1Move.start();

    var cube2Move = new TWEEN.Tween( smallCube2.position )
            .to( { x: -500, y: 500, z: 500 }, 13000 )
            .easing( TWEEN.Easing.Quadratic.In )
            .onComplete(function() {
                smallCube2.position.set( smallCube2OrigPos.x, smallCube2OrigPos.y, smallCube2OrigPos.z );
            });

    cube2Move.chain( cube2Move );

    window.setTimeout(function() {
        cube2Move.start();
    }, 1500);

    var cube3Move = new TWEEN.Tween( smallCube3.position )
            .to( { x: -500, y: -500, z: -200 }, 17000 )
            .easing( TWEEN.Easing.Quadratic.In )
            .onComplete(function() {
                smallCube3.position.set( smallCube3OrigPos.x, smallCube3OrigPos.y, smallCube3OrigPos.z );
            });

    cube3Move.chain( cube3Move );
    cube3Move.start();


    function animate() {

        controls.update();

        TWEEN.update();

        // Re-render
        renderer.render(scene, camera);

        // Call animate again once browser's ready for next frame
        requestAnimationFrame( animate )

    }

    // Start animation going
    animate();

})();