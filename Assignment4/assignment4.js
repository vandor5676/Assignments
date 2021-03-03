"use strict";

var canvas;
var gl;

var numPositions  = 12;

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [0, 0, 0];
var translation = [0, 0, 0];
var scale = [1, 1, 1];
var mat1 = translate(0.3,0,0);
var mat2 = rotateY(-45);
var affine1 = flatten(mat4());

var thetaLoc;
var uTranslation;
var uScale;
var uAffine1;

var centeringconstY = 0.433;
var centeringconstZ = 0.408;
    
var vertices = [
        
    vec4(0.0, 0.433-centeringconstY,  0.816-centeringconstZ, 1.0),//0
    vec4(0.5,  0.0-centeringconstY,  0.0-centeringconstZ, 1.0),//1
    vec4(0.0, 0.866-centeringconstY,  0.0-centeringconstZ, 1.0),//2
    vec4(-0.5,  0.0-centeringconstY,  0.0-centeringconstZ, 1.0)//3
    
];

var vertexColors = [
    vec4(0.7, 0.7, 0.7, 1.0),  // black
    vec4(1.0, 0.5, 0.5, 1.0),  // red
    vec4(0.2, 0.4, 0.9, 1.0),  // yellow
    vec4(0.0, 1.0, 0.0, 1.0),  // green
    // vec4(Math.random(), Math.random(),Math.random(), 1.0), 
    // vec4(Math.random(), Math.random(),Math.random(), 1.0), 
    // vec4(Math.random(), Math.random(),Math.random(), 1.0), 
    // vec4(Math.random(), Math.random(),Math.random(), 1.0),

    // vec4(0.0245019730168341, 0.9200946361333009, 0.06263875857974943, 1),
    // vec4(0.8683096346425287, 0.10982332488784863, 0.4627265576886377, 1), 
    // vec4(0.5660531495244645, 0.5364220663020884, 0.6008126141768515, 1) ,
    // vec4(0.4042555652002686, 0.13026390965949775, 0.5537132974235977, 1),

];

var indices = [
    0,1,2,
    1,0,3,
    2,3,0,
    3,2,1
];

window.onload = function init()
{
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    //colorCube();

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST); //hidden serface removal?

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // array element buffer
    //i think this is where the order of verticies is defined for a face 
    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);


    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

    var colorLoc = gl.getAttribLocation( program, "aColor" );
    gl.vertexAttribPointer( colorLoc, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( colorLoc );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    thetaLoc = gl.getUniformLocation(program, "uTheta");
    uTranslation = gl.getUniformLocation(program, "uTranslation");
    uScale = gl.getUniformLocation(program, "uScale");
    uAffine1 = gl.getUniformLocation(program, "uAffine1");
    
    //event listeners for buttons
    initButtons();

    render();
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniform3fv(thetaLoc, theta);
    gl.uniform3fv(uTranslation, translation);
    gl.uniform3fv(uScale, scale);
    gl.uniformMatrix4fv(uAffine1,false,affine1 );

    gl.drawElements(gl.TRIANGLES, numPositions, gl.UNSIGNED_BYTE, 0);
    requestAnimationFrame(render);
}
