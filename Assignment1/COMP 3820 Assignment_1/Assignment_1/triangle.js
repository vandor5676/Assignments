"use strict";

var gl;
var points, pointsSquare, vertices;

var colors = [1, 0, 0, 0, 1, 0, 0, 0, 1];
var program;
var bufferId;
var cBuffer;
var squareTryangleCircle;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) { alert("WebGL 2.0 isn't available"); }

    //
    //  Initialize our data for a single triangle
    //

    // First, initialize the  three points.

    points = new Float32Array([
        -1, -1,
        0, 1,
        1, -1,
    ]);

    pointsSquare = new Float32Array([
        -0.75, 0.75,
        0.75, 0.75,
        0.75, -0.75,
        -0.75, -0.75
    ]);
    vertices = [
        vec2(-0.5, -0.5),
        vec2(-0.5, 0.5),
        vec2(0.5, 0.5),
        vec2(0.5, -0.5)
    ];

    //
    //  Configure WebGL
    //
    //clip cordinants 
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.7, 0.7, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU
    // var bufferId = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    // gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    // var aPosition = gl.getAttribLocation(program, "aPosition");
    // gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(aPosition);




    // cBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);//new Float32Array(colors)

    // var aColor = gl.getAttribLocation(program, "aColor");
    // //3 points colors?
    // gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(aColor);

    window.addEventListener('keydown', this.checkKey);

    render(3);
};

function render(colorName) {
    var numPoints;
    var colors =[];
    var colorArray = [];

    if(colorName == "red") colorArray = [1,0,0];
    else if(colorName == "green")colorArray = [0,1,0];
    else if(colorName == "blue")colorArray = [0,0,1];

    if(squareTryangleCircle == "square")
    {
        numPoints = 4;        
        for(var i=0;i<numPoints;i++)colors.push(...colorArray);        
    }
    else if(squareTryangleCircle == "trinagle")
    {
        numPoints = 3;
        for(var i=0;i<numPoints;i++)colors.push(...colorArray); 
    }

    gl.bufferSubData(gl.ARRAY_BUFFER, points, new Float32Array(colors));
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, numPoints);
}

function renderTriangle() {
    //
    var canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext('webgl2');

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.7, 0.7, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    // Associate out shader variable with our data buffer

    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);


    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

}  //drawelements() ?

//function that renders a square
function renderSquare() {
    var canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext('webgl2');

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.7, 0.7, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    // Load the data into the GPU

    bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variable with our data buffer

    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);


    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}
function checkKey(e) {
    //alert(e.keyCode);
    switch (e.keyCode) {
        //red
        case 49:
            var colors = [1, 0, 0,1, 0, 0,1, 0, 0];
            gl.bufferSubData(gl.ARRAY_BUFFER, points, new Float32Array(colors));
            render("red");
            break;
        //green
        case 50:
            var colors = [0, 1, 0, 0, 1, 0, 0, 1, 0];
            gl.bufferSubData(gl.ARRAY_BUFFER, points, new Float32Array(colors));
            render("green");
            break;
        //blue
        case 51:
            var colors = [0, 0, 1, 0, 0, 1, 0, 0, 1];
            gl.bufferSubData(gl.ARRAY_BUFFER, pointsSquare, new Float32Array(colors));
            render("blue");
            break;
        //random color
        case 52:
            var colors = [1, 0, 1, 0, 0, 0, 1, 0, 0];
            gl.bufferSubData(gl.ARRAY_BUFFER, points, new Float32Array(colors));
            renderTriangle();
            break;
        //favourite color
        case 53:
            var colors = [1, 0, 0, 1, 0, 0, 1, 0, 0];
            gl.bufferSubData(gl.ARRAY_BUFFER, points, new Float32Array(colors));
            renderTriangle();
            break;
        //triangle
        case 84:
            squareTryangleCircle = "trinagle";
            var colors = [1, 0, 0, 1, 0, 0, 1, 0, 0];

            var bufferId = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
            gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

            var aPosition = gl.getAttribLocation(program, "aPosition");
            gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aPosition);

            cBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);//new Float32Array(colors)

            var aColor = gl.getAttribLocation(program, "aColor");
            //3 points colors?
            gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aColor);

            render();
            // requestAnimationFrame(render);
            break;
        // square
        case 83:
            squareTryangleCircle = "square";
            var colors = [0, 0, 1, 0, 0, 1, 0, 0, 1,0,0,1];

            var bufferId = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
            gl.bufferData(gl.ARRAY_BUFFER, pointsSquare, gl.STATIC_DRAW);

            var aPosition = gl.getAttribLocation(program, "aPosition");
            gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aPosition);

            cBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);//new Float32Array(colors)

            var aColor = gl.getAttribLocation(program, "aColor");
            //3 points colors?
            gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aColor);

            render();
            break;
        // circle
        case 67:
            var colors = [1, 0, 0, 1, 0, 0, 1, 0, 0];
            gl.bufferSubData(gl.ARRAY_BUFFER, points, new Float32Array(colors));
            renderTriangle();
            break;
    }
}