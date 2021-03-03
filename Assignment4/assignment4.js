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

var thetaLoc;
var uTranslation;
var uScale;

var centeringconstY = 0.3;
var centeringconstZ = 0.406;
    
var vertices = [
        
    vec4(0.0, 0.3-centeringconstY,  0.812-centeringconstZ, 1.0),//0
    vec4(0.5,  0.0-centeringconstY,  0.0-centeringconstZ, 1.0),//1
    vec4(0.0, 0.812-centeringconstY,  0.0-centeringconstZ, 1.0),//2
    vec4(-0.5,  0.0-centeringconstY,  0.0-centeringconstZ, 1.0)//3
    
];

var vertexColors = [
    vec4(0.0, 0.5, 0.0, 1.0),  // black
    vec4(1.0, 0.0, 0.0, 1.0),  // red
    vec4(1.0, 1.0, 0.0, 1.0),  // yellow
    vec4(0.0, 1.0, 0.0, 1.0),  // green
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
    //i think this is where the order of verticies is defined
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

    gl.drawElements(gl.TRIANGLES, numPositions, gl.UNSIGNED_BYTE, 0);
    requestAnimationFrame(render);
}
