"use strict";

var gl;
var triangle;
var square;
var program;
var program2;
var t_vPosition;
var s_vPosition;
var tBuffer;
var sBuffer;
var t_cBuffer;
var s_cBuffer;
var shape = 1; //1: triangle, 2: square
var colorC = [0,0,1, 1,0,0, 0,1,0];
var colorS = [0,0,1, 1,0,0, 0,1,0, 1,1,0];
var t_ColorLoc;
var s_ColorLoc;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }

    triangle = new Float32Array([
        -1, -1 ,
         0,  1 ,
         1, -1
    ]);

    square = new Float32Array([
        -1,  1,
        -1, -1,
         1,  1,
         1, -1
    ]);

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );
    gl.clear(gl.COLOR_BUFFER_BIT);

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    program2 = initShaders( gl, "vertex-shader", "fragment-shader" );

    tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, triangle, gl.STATIC_DRAW );

    t_vPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( t_vPosition, 2, gl.FLOAT, false, 0, 0 );

    t_cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, t_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorC), gl.STATIC_DRAW );

    t_ColorLoc = gl.getAttribLocation( program, "aColor");
    gl.vertexAttribPointer(t_ColorLoc, 3, gl.FLOAT, false, 0, 0);
    
    gl.useProgram( program );
    gl.enableVertexAttribArray( t_vPosition );

    gl.enableVertexAttribArray(t_ColorLoc);

    render();

    sBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, sBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, square, gl.STATIC_DRAW );
    s_vPosition = gl.getAttribLocation( program2, "aPosition" );
    gl.vertexAttribPointer( s_vPosition, 2, gl.FLOAT, false, 0, 0 );

    s_cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, s_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorS), gl.STATIC_DRAW );

    s_ColorLoc = gl.getAttribLocation( program2, "aColor");
    gl.vertexAttribPointer(s_ColorLoc, 3, gl.FLOAT, false, 0, 0);

    window.addEventListener('keydown', this.checkKey);

};


function render() {
    if(shape==1){
        gl.clear( gl.COLOR_BUFFER_BIT );
        gl.drawArrays( gl.TRIANGLES, 0, 3 );
    }else if(shape==2){
        gl.clear( gl.COLOR_BUFFER_BIT );
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
}

function checkKey(e){
    switch(e.keyCode){
        case 49: 
            if(shape==1){
                colorC = [1,0,0, 1,0,0, 1,0,0];
                triangle_Binding();
            }else if(shape==2){
                colorS = [1,0,0, 1,0,0, 1,0,0, 1,0,0];
                square_Binding();
            }
            render();
            break;
        case 83:
            shape = 2;
            square_Binding();
            render();
            break;
        case 84:
            shape = 1;
            triangle_Binding();
            render();
            break;    
    }   
}

function triangle_Binding(){
    gl.useProgram( program );
    gl.enableVertexAttribArray( t_vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.vertexAttribPointer( t_vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer(gl.ARRAY_BUFFER, t_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorC), gl.STATIC_DRAW );
    t_ColorLoc = gl.getAttribLocation( program, "aColor");
    gl.vertexAttribPointer(t_ColorLoc, 3, gl.FLOAT, false, 0, 0);
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