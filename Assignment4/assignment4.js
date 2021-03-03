"use strict";

var canvas;
var gl;

var numPositions  = 12;

var positions = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [0, 0, 0];

var thetaLoc;

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

    //event listeners for buttons

    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };

    render();
}

function colorCube()
{
    quad(0, 1, 2);
    quad(1, 0, 3);
    quad(2, 3, 0);
    quad(3, 2, 1);
    // quad(4, 5, 6, 7);
    // quad(5, 4, 0, 1);
}



function quad(a, b, c, d)
{
    

    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices

    //vertex color assigned by the index of the vertex

    var indices = [a, b, c];

    for ( var i = 0; i < indices.length; ++i ) {
        positions.push( vertices[indices[i]] );
        //colors.push( vertexColors[indices[i]] );

        // for solid colored faces use
        colors.push(vertexColors[a]);
    }
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta[axis] += 1.0;
    gl.uniform3fv(thetaLoc, theta);

    gl.drawElements(gl.TRIANGLES, numPositions, gl.UNSIGNED_BYTE, 0);
    requestAnimationFrame(render);
}
