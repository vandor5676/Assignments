"use strict";

var gl;
var points, pointsSquare, circlePoints;

var colors = [1, 0, 0, 0, 1, 0, 0, 0, 1];
var program;
var bufferId;
var cBuffer;
var squareTryangleCircle;
var s = [];

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
    for (var i = 0; i < numVerts; i++) {
        var u = i / numVerts;
        var angle = u * 3.14159 * 2.0;
        var pos = vec2(Math.cos(angle) * radius, Math.sin(angle) * radius);
        circlePoints.push(pos);
    }



    squareTryangleCircle = "circle";
    var colors = [1, 0, 1, 1, 0, 1];
    var numPoints = numVerts;
    for (var i = 0; i < numPoints; i++)colors.push(1, 0, 1);


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
    $("#initalButton").click(displayLetter)

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
    else if (colorName == "random") colorArray = [Math.random(), Math.random(), Math.random()];

    if (squareTryangleCircle == "square") {
        numPoints = 4;
        for (var i = 0; i < numPoints; i++)colors.push(...colorArray);
    }
    else if (squareTryangleCircle == "trinagle") {
        numPoints = 3;
        for (var i = 0; i < numPoints; i++)colors.push(...colorArray);
    }
    else if (squareTryangleCircle == "circle") {
        numPoints = 100;
        for (var i = 0; i < numPoints; i++)colors.push(...colorArray);
    }
    else if (squareTryangleCircle == "letter") {
        numPoints = 240;
        for (var i = 0; i < numPoints; i++)colors.push(...colorArray);
       
        gl.bufferSubData(gl.ARRAY_BUFFER, points, new Float32Array(colors));
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.LINE_STRIP, 0, numPoints);
        return;
    }


    gl.bufferSubData(gl.ARRAY_BUFFER, points, new Float32Array(colors));
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, numPoints);
}

//displays the letter s 
function displayLetter() {
    var xypoints = [0.20, 0.84, 0.22, 0.84, 0.22, 0.84, 0.22, 0.84, 0.22, 0.84, 0.22, 0.84, 0.22, 0.84, 0.22, 0.84, 0.22, 0.84, 0.21, 0.84, 0.21, 0.84, 0.21, 0.85, 0.21, 0.85, 0.21, 0.85, 0.21, 0.85, 0.21, 0.85, 0.20, 0.85, 0.20, 0.85, 0.20, 0.85, 0.20, 0.85, 0.20, 0.85, 0.20, 0.85, 0.20, 0.85, 0.19, 0.85, 0.19, 0.85, 0.19, 0.85, 0.19, 0.85, 0.19, 0.85, 0.19, 0.85, 0.19, 0.85, 0.19, 0.85, 0.19, 0.85, 0.18, 0.85, 0.18, 0.85, 0.18, 0.85, 0.18, 0.86, 0.18, 0.86, 0.18, 0.86, 0.18, 0.86, 0.18, 0.86, 0.17, 0.86, 0.17, 0.86, 0.17, 0.86, 0.17, 0.86, 0.17, 0.86, 0.17, 0.86, 0.17, 0.86, 0.17, 0.86, 0.16, 0.86, 0.16, 0.86, 0.16, 0.86, 0.16, 0.86, 0.16, 0.86, 0.16, 0.86, 0.15, 0.86, 0.15, 0.86, 0.15, 0.87, 0.15, 0.87, 0.15, 0.87, 0.15, 0.87, 0.15, 0.87, 0.15, 0.87, 0.15, 0.87, 0.15, 0.87, 0.15, 0.87, 0.15, 0.87, 0.14, 0.87, 0.14, 0.87, 0.14, 0.87, 0.14, 0.87, 0.14, 0.88, 0.14, 0.88, 0.14, 0.88, 0.14, 0.88, 0.14, 0.88, 0.13, 0.88, 0.13, 0.88, 0.13, 0.88, 0.13, 0.89, 0.13, 0.89, 0.13, 0.89, 0.13, 0.89, 0.13, 0.89, 0.13, 0.89, 0.13, 0.89, 0.13, 0.89, 0.13, 0.89, 0.13, 0.90, 0.13, 0.90, 0.13, 0.90, 0.13, 0.90, 0.13, 0.90, 0.13, 0.90, 0.13, 0.91, 0.13, 0.91, 0.13, 0.91, 0.13, 0.91, 0.13, 0.91, 0.13, 0.91, 0.14, 0.91, 0.14, 0.91, 0.14, 0.91, 0.14, 0.91, 0.14, 0.91, 0.14, 0.91, 0.14, 0.91, 0.15, 0.91, 0.15, 0.92, 0.15, 0.92, 0.15, 0.92, 0.15, 0.92, 0.15, 0.92, 0.15, 0.92, 0.15, 0.92, 0.15, 0.92, 0.15, 0.92, 0.16, 0.92, 0.16, 0.92, 0.16, 0.92, 0.16, 0.92, 0.16, 0.92, 0.16, 0.92, 0.16, 0.92, 0.16, 0.92, 0.17, 0.92, 0.17, 0.92, 0.17, 0.92, 0.17, 0.92, 0.17, 0.92, 0.17, 0.92, 0.18, 0.92, 0.18, 0.92, 0.18, 0.92, 0.18, 0.92, 0.18, 0.92, 0.18, 0.92, 0.19, 0.92, 0.19, 0.92, 0.19, 0.92, 0.19, 0.93, 0.19, 0.93, 0.19, 0.93, 0.19, 0.93, 0.19, 0.93, 0.19, 0.93, 0.20, 0.93, 0.20, 0.93, 0.20, 0.93, 0.20, 0.93, 0.20, 0.93, 0.20, 0.93, 0.20, 0.93, 0.20, 0.93, 0.21, 0.93, 0.21, 0.93, 0.21, 0.93, 0.21, 0.94, 0.21, 0.94, 0.21, 0.94, 0.21, 0.94, 0.21, 0.94, 0.21, 0.94, 0.21, 0.94, 0.21, 0.94, 0.21, 0.94, 0.21, 0.94, 0.21, 0.95, 0.22, 0.95, 0.22, 0.95, 0.22, 0.95, 0.22, 0.95, 0.22, 0.95, 0.22, 0.95, 0.22, 0.96, 0.22, 0.96, 0.22, 0.96, 0.22, 0.96, 0.21, 0.96, 0.21, 0.96, 0.21, 0.96, 0.21, 0.96, 0.21, 0.96, 0.21, 0.97, 0.21, 0.97, 0.21, 0.97, 0.21, 0.97, 0.20, 0.97, 0.20, 0.97, 0.20, 0.97, 0.20, 0.97, 0.20, 0.97, 0.20, 0.97, 0.20, 0.97, 0.20, 0.97, 0.20, 0.97, 0.19, 0.97, 0.19, 0.98, 0.19, 0.98, 0.19, 0.98, 0.19, 0.98, 0.19, 0.98, 0.19, 0.98, 0.19, 0.98, 0.18, 0.98, 0.18, 0.98, 0.18, 0.98, 0.18, 0.98, 0.18, 0.98, 0.18, 0.98, 0.18, 0.98, 0.17, 0.98, 0.17, 0.98, 0.17, 0.98, 0.17, 0.98, 0.17, 0.98, 0.17, 0.98, 0.17, 0.98, 0.16, 0.98, 0.16, 0.98, 0.16, 0.98, 0.16, 0.98, 0.16, 0.98, 0.16, 0.98, 0.16, 0.98, 0.15, 0.98, 0.15, 0.98, 0.15, 0.98, 0.15, 0.98, 0.15, 0.98, 0.15, 0.98, 0.15, 0.98, 0.14, 0.98, 0.14, 0.98, 0.14, 0.98, 0.14, 0.98, 0.14, 0.98, 0.14, 0.98, 0.13, 0.98, 0.13, 0.99, 0.13, 0.99, 0.13, 0.99, 0.13, 0.99, 0.13, 0.99, 0.13, 0.99, 0.13, 1.00, 0.13, 1.00, 0.13, 1.00, 0.13, 1.00]
    var x;
    var even = true;
    xypoints = $.map(xypoints, function (v) {

        x = (v * 1.6) - 1
        if (even) {
            x = (x * -1) - .8
            even = false;
        }
        else {
            x = x - .5
            even = true;
        }

        return ((x * 4) + .3);
    });
    var numbers = new Float32Array(xypoints);
    squareTryangleCircle = "letter";
    var colors = [1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0];

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, numbers, gl.STATIC_DRAW);

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
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.drawArrays(gl.LINE_STRIP, 0, 240);

}

function myFunction(e) {
    var x = e.clientX;
    var y = e.clientY;
    var coor = "Coordinates: (" + x + "," + y + ")";
    document.getElementById("demo").innerHTML = coor;
    s.push(x);
    s.push(y);
}

//function that handles key presses
function checkKey(e) {
    //alert(e.keyCode);
    switch (e.keyCode) {
        //red
        case 49:
            render("red");
            break;
        //green
        case 50:
            render("green");
            break;
        //blue
        case 51:
            render("blue");
            break;
        //random color
        case 52:
            render("random");
            break;
        //favourite color
        case 53:
            render("favourite");
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
            for (var i = 0; i < numPoints; i++)colors.push(1, 0, 1);


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