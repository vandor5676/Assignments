"use strict";

var gl;
var points, pointsSquare, circlePoints;

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
    //  Configure WebGL
    //
    //clip cordinants 
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.7, 0.7, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    //
    //  Initialize our data for a single triangle
    //

    // First, initialize the  three points.

    points = new Float32Array([-1, -1,
        0, 1,
        1, -1,
    ]);

    pointsSquare = new Float32Array([-0.75, 0.75,
        0.75, 0.75,
        0.75, -0.75, -0.75, -0.75
    ]);

    const numVerts = 100;
    var radius = 0.8
    circlePoints = [];
    for(var i =0;i<numVerts;i++)
    {
        var u = i / numVerts;
        var angle = u * 3.14159 * 2.0;
        var pos = vec2(Math.cos(angle)* radius, Math.sin(angle)* radius) ;
        circlePoints.push(pos);
    }

    

    squareTryangleCircle = "circle";
            var colors = [1, 0, 1, 1, 0, 1];
            var numPoints = numVerts;
            for (var i = 0; i < numPoints; i++)colors.push(1,0,1);
    

            var bufferId = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(circlePoints), gl.STATIC_DRAW);

            var aPosition = gl.getAttribLocation(program, "aPosition");
            gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aPosition);

            cBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW); //new Float32Array(colors)

            var aColor = gl.getAttribLocation(program, "aColor");
            //3 points colors?
            gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aColor);
        
            render("red");

    window.addEventListener('keydown', this.checkKey);

};

//function to set rendering peramiters 
function render(colorName) {
    var numPoints;
    var colors = [];
    var colorArray = [];

    if (colorName == "red") colorArray = [1, 0, 0];
    else if (colorName == "green") colorArray = [0, 1, 0];
    else if (colorName == "blue") colorArray = [0, 0, 1];
    else if (colorName == "favourite") colorArray = [.7, .1, 1];

    if (squareTryangleCircle == "square") {
        numPoints = 4;
        for (var i = 0; i < numPoints; i++ )colors.push(...colorArray);
    }
    else if (squareTryangleCircle == "trinagle") {
        numPoints = 3;
        for (var i = 0; i < numPoints; i++ )colors.push(...colorArray);
    }
    else if (squareTryangleCircle == "circle") {
        numPoints = 100;
        for (var i = 0; i < numPoints; i++)colors.push(...colorArray);
    }

    gl.bufferSubData(gl.ARRAY_BUFFER, points, new Float32Array(colors));
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, numPoints);
}

//function that handles key presses
function checkKey(e) {
    //alert(e.keyCode);
    switch (e.keyCode) {
        //red
        case 49:
            var colors = [1, 0, 0, 1, 0, 0, 1, 0, 0];
            gl.bufferSubData(gl.ARRAY_BUFFER, points, new Float32Array(colors));
            render("red");
            break;
        //green
        case 50:
           // var colors = [0, 1, 0, 0, 1, 0, 0, 1, 0];
           // gl.bufferSubData(gl.ARRAY_BUFFER, points, new Float32Array(colors));
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
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW); //new Float32Array(colors)

            var aColor = gl.getAttribLocation(program, "aColor");
            //3 points colors?
            gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aColor);

            render();
            break;
        // square
        case 83:
            squareTryangleCircle = "square";
            var colors = [0, 1, 1, 0, 1, 1, 0.5, 0, 1, .6, .1, 1];

            var bufferId = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
            gl.bufferData(gl.ARRAY_BUFFER, pointsSquare, gl.STATIC_DRAW);

            var aPosition = gl.getAttribLocation(program, "aPosition");
            gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aPosition);

            cBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW); //new Float32Array(colors)

            var aColor = gl.getAttribLocation(program, "aColor");
            gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aColor);

            render();
            break;
        // circle
        case 67:
            squareTryangleCircle = "circle";
            var colors = [1, 0, 1, 1, 0, 1];
            var numPoints = 100;
            for (var i = 0; i < numPoints; i++)colors.push(1,0,1);
    

            var bufferId = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(circlePoints), gl.STATIC_DRAW);

            var aPosition = gl.getAttribLocation(program, "aPosition");
            gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aPosition);

            cBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW); //new Float32Array(colors)

            var aColor = gl.getAttribLocation(program, "aColor");
            //3 points colors?
            gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aColor);
        
            render("favourite");
            break;
    }
}