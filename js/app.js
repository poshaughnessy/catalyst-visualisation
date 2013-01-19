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

    camera.position.x = -225;
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

    smallCube1.position.set(100, 100, 0);
    smallCube1.rotation.y = Math.PI / 4;

    scene.add(smallCube1);

    var smallCube2 = new THREE.Mesh(
            new THREE.CubeGeometry( 20, 20, 20 ),
            new THREE.MeshLambertMaterial( {
                map: THREE.ImageUtils.loadTexture('img/graphite.png'),
                emissive: 0x111111} ));

    smallCube2.position.set(-100, 85, 0);
    smallCube2.rotation.y = Math.PI / 4;

    scene.add(smallCube2);

    var smallCube3 = new THREE.Mesh(
            new THREE.CubeGeometry( 10, 10, 10 ),
            new THREE.MeshLambertMaterial( {
                map: THREE.ImageUtils.loadTexture('img/graphite.png'),
                emissive: 0x111111} ));

    smallCube3.position.set(-100, -50, 0);
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

    //scene.add( spotLight1 );
    scene.add( spotLight2 );


    // Lens flare test
    /*
    var textureFlare = THREE.ImageUtils.loadTexture( "img/lensflare.png" );

    addLight( 0.43, 0.73, 0.93, 10, 10, 0 );

    function addLight( h, s, v, x, y, z ) {

        var light = new THREE.PointLight( 0xffffff, 1.5, 4500 );
        light.position.set( x, y, z );
        scene.add( light );

        light.color.setHSV( h, s, v );

        var flareColor = new THREE.Color( 0xffffff );
        flareColor.copy( light.color );
        THREE.ColorUtils.adjustHSV( flareColor, 0, -0.5, 0.5 );

        var lensFlare = new THREE.LensFlare( textureFlare, 700, 0.0, THREE.AdditiveBlending, flareColor );

        lensFlare.customUpdateCallback = lensFlareUpdateCallback;
        lensFlare.position = light.position;

        scene.add( lensFlare );

    }

    function lensFlareUpdateCallback( object ) {

        var f, fl = object.lensFlares.length;
        var flare;
        var vecX = -object.positionScreen.x * 2;
        var vecY = -object.positionScreen.y * 2;


        for( f = 0; f < fl; f++ ) {

            flare = object.lensFlares[ f ];

            flare.x = object.positionScreen.x + vecX * flare.distance;
            flare.y = object.positionScreen.y + vecY * flare.distance;

            flare.rotation = 0;

        }

    }

    //

    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.physicallyBasedShading = true;
    */


    function animate() {

        controls.update();

        // Re-render
        renderer.render(scene, camera);

        // Call animate again once browser's ready for next frame
        requestAnimationFrame( animate )

    }

    // Start animation going
    animate();

})();