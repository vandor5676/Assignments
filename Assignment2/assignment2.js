"use strict";

var gl;
var points ,points2;
var LRTranslation;
var backAndForth = 0.0;
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

    LRTranslation = gl.getUniformLocation(program, "uLRTranslation");

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
    angle = angle >=2*3.14159 ?0:angle+=0.05;

   // square();

    gl.uniform1f(LRTranslation, backAndForth);
    
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    setTimeout(
        function () {requestAnimationFrame(render);},
        5.0// speed
    );
}

function flip()
{
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, points2, gl.STATIC_DRAW );
}

function square_Binding(){
    gl.useProgram( program2 );
    gl.enableVertexAttribArray( s_vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, sBuffer );
    gl.vertexAttribPointer( s_vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer(gl.ARRAY_BUFFER, s_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorS), gl.STATIC_DRAW );
    s_ColorLoc = gl.getAttribLocation( program2, "aColor");
    gl.vertexAttribPointer(s_ColorLoc, 3, gl.FLOAT, false, 0, 0);
}
function square()
{
   // squareTryangleCircle = "square";
    var colors = [0, 1, 1, 0, 1, 1, 0.5, 0, 1, .6, .1, 1];

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, points2, gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    // cBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW); //new Float32Array(colors)

    // var aColor = gl.getAttribLocation(program, "aColor");
    // gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(aColor);

    render();
}
