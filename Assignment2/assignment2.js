"use strict";

var gl;
var points ,points2;
var LRTranslation, matrixLocation ;
var backAndForth = 0.0; 
var matrix =[-1,0,0,0,1,0,0,0,1];
var angle =0,directionMutiplyer = 1,angleIncroment=0.05, savedAngleIncroment;
var program;
var circlePoints;


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

        const numVerts = 100;
    var radius = 0.8
    circlePoints = [];
    for (var i = 0; i < numVerts; i++) {
        var u = i / numVerts;
        var angle = u * 3.14159 * 2.0;
        var pos = vec2(Math.cos(angle) * radius, Math.sin(angle) * radius);
        circlePoints.push(pos);
    }
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


    $("#startButton").click(start);
    $("#stopButton").click(stop);
    $("#directionButton").click(chnageDirection);
    $("#speedSlider").on('input',sliderChange);


    render();
};

function sliderChange()
{
    //alert( typeof $("#speedSlider").val());
    angleIncroment = parseFloat($("#speedSlider").val()) *directionMutiplyer;
    savedAngleIncroment = angleIncroment;
}

//start the animation
function start()
{
    angleIncroment =savedAngleIncroment;
}
//stop the animation
function stop()
{
    if(angleIncroment != 0)
    savedAngleIncroment = angleIncroment;
    angleIncroment = 0;
}
//change the animations direction
function chnageDirection()
{
    directionMutiplyer=directionMutiplyer*-1;
    angleIncroment = angleIncroment * -1;
    savedAngleIncroment =savedAngleIncroment *-1;
}
//render function
function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    angle = angle >=2*3.14159 ?0:angle+=angleIncroment;
    if (angle < 0) {
        angle = 0;
        chnageDirection();
    }
    else{
        matrix = angle >=1*3.14159  ?[1*directionMutiplyer,0,(Math.cos(angle)/1.43),0,1,0,0,0,1]:[-1*directionMutiplyer,0,(Math.cos(angle)/1.43),0,1,0,0,0,1]
    }

    //update parameters
    gl.uniformMatrix3fv(matrixLocation, false, matrix);
    $("#debugP").text(angle.toFixed(2));
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    setTimeout(
        function () {requestAnimationFrame(render);},
        5.0// speed
    );
}


