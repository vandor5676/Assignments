"use strict";

var gl;
var points;
var LRTranslation;
var test = 0.0;
var angle =0;


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
          0.3, -0.3
        ]);

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, points, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( aPosition );

    LRTranslation = gl.getUniformLocation(program, "uLRTranslation");

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    test += Math.cos(angle);
    angle = angle ==360?0:angle+=0.01;
    
    console.log(test);

    gl.uniform1f(LRTranslation, test/100);
    
    gl.drawArrays( gl.TRIANGLES, 0, 3 );

    setTimeout(
        function () {requestAnimationFrame(render);},
        0.1// speed
    );
}
