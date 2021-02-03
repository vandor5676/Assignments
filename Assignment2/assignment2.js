"use strict";

var gl;
var points ,points2;
var LRTranslation, matrixLocation ;
var backAndForth = 0.0; 
var matrix =[-1,0,0,0,1,0,0,0,1];
var angle =0;
var program;


window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }

    //
    //  Initialize our data for a single triangle
    //

    // First, initialize the  three points.

     points = new Float32Array([
       -0.3, -0.3 ,
          0,  0.3 ,
          0.3, -0.3,
          0.5,0.1
        ]);
     points2 = new Float32Array([
       -0.3, -0.3 ,
          0.3,  0 ,
          -0.3, 0.3,
          0.1,0.5
        ]);

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, points, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( aPosition );

    //lookups
    LRTranslation = gl.getUniformLocation(program, "uLRTranslation");
    matrixLocation = gl.getUniformLocation(program, "u_matrix");

    // Set the matrix.
   // gl.uniformMatrix3fv(matrixLocation, false, matrix);

    $("#startButton").click(start);
    $("#stopButton").click(stop);
    $("#directionButton").click(chnageDirection);


    render();
};

function start()
{
    alert();
}
function stop()
{
    alert();
}
function chnageDirection()
{
    alert();
}
function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    //make shape go back and forth,  
    backAndForth = (Math.cos(angle)/1.43);

    matrix = angle >=1*3.14159 ?[1,0,Math.cos(angle)/1.43,0,1,0,0,0,1]:[-1,0,Math.cos(angle)/1.43,0,1,0,0,0,1]
    angle = angle >=2*3.14159 ?0:angle+=0.05;

    //update parameters
    gl.uniform1f(LRTranslation, backAndForth=0);
    gl.uniformMatrix3fv(matrixLocation, false, matrix);
    
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    setTimeout(
        function () {requestAnimationFrame(render);},
        5.0// speed
    );
}

// var matrix = {
//     flip: function()
//     {
//        return  [1,0,0,
//         0,1,0,
//     0,0,1]
//     }
// };


