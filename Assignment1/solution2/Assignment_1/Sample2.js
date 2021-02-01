"use strict";

var gl;
var triangle;
var circle = [];
var program3;
var c_vPosition;
var cBuffer;
var c_cBuffer;
var colorC = [0,1,1];
var c_ColorLoc;
const stops = 100; // You can change this value.

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }

    for(var i=0.0;i<stops;i++){
        circle.push(Math.cos(i*2*Math.PI/stops));
        circle.push(Math.sin(i*2*Math.PI/stops));
    }

    circle.push(0.0);
    circle.push(0.0);

    for(var i=0; i<=stops; i++){
        colorC.push(0,1,1);
    }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );
    gl.clear(gl.COLOR_BUFFER_BIT);

    program3 = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program3 );

    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(circle), gl.STATIC_DRAW );
    c_vPosition = gl.getAttribLocation( program3, "aPosition" );
    gl.vertexAttribPointer( c_vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( c_vPosition );

    c_cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, c_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorC), gl.STATIC_DRAW );

    c_ColorLoc = gl.getAttribLocation( program3, "aColor");
    gl.vertexAttribPointer(c_ColorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(c_ColorLoc);   

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, stops+1 );
}
