"use strict";

var gl;
var program;
var shadedCube = function () {

   var canvas;

   var numPositions = 36;

   var positionsArray = [];
   var normalsArray = [];

   var vertices = [
      vec4(-0.5, -0.5, 0.5, 1.0),
      vec4(-0.5, 0.5, 0.5, 1.0),
      vec4(0.5, 0.5, 0.5, 1.0),
      vec4(0.5, -0.5, 0.5, 1.0),
      vec4(-0.5, -0.5, -0.5, 1.0),
      vec4(-0.5, 0.5, -0.5, 1.0),
      vec4(0.5, 0.5, -0.5, 1.0),
      vec4(0.5, -0.5, -0.5, 1.0)
   ];
   

   var lightPosition = vec4(1.0, 1.0, 1.0, 0.0);
   var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0);
   var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
   var lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);

   var materialAmbient = vec4(1.0, 0.0, 1.0, 1.0);
   var materialDiffuse = vec4(1.0, 0.8, 0.8, 1.0);
   var materialSpecular = vec4(1.0, 0.8, 0.0, 1.0);
   var materialShininess = 100.0;

   var ctm;
   var ambientColor, diffuseColor, specularColor;
   var modelViewMatrix, projectionMatrix;
   var viewerPos;

   var xAxis = 0;
   var yAxis = 1;
   var zAxis = 2;
   var axis = 0;
   var theta = vec3(0, 0, 0);

   var thetaLoc;

   var flag = false;

   function quad(a, b, c, d) {

      var t1 = subtract(vertices[b], vertices[a]);
      var t2 = subtract(vertices[c], vertices[b]);
      var normal = cross(t1, t2);
      normal = vec3(normal);


      positionsArray.push(vertices[a]);
      normalsArray.push(normal);
      positionsArray.push(vertices[b]);
      normalsArray.push(normal);
      positionsArray.push(vertices[c]);
      normalsArray.push(normal);
      positionsArray.push(vertices[a]);
      normalsArray.push(normal);
      positionsArray.push(vertices[c]);
      normalsArray.push(normal);
      positionsArray.push(vertices[d]);
      normalsArray.push(normal);
   }


   function colorCube() {
      quad(1, 0, 3, 2);
      quad(2, 3, 7, 6);
      quad(3, 0, 4, 7);
      quad(6, 5, 1, 2);
      quad(4, 5, 6, 7);
      quad(5, 4, 0, 1);
   }
   //---- ui ----
   //----
   var scaleFactor =1;
   var cordShiftX = 0;
   var cordShiftY = 0;
   var cordShiftZ = 0;
 
   var rotateX = 0;
   var rotateY = 0;
   var rotateZ = 0;

   webglLessonsUI.setupSlider("#cubeSize", { value: (scaleFactor), slide: updateBase, step:0.01, min: .5, max: 1.5 });
   function updateBase(event, ui) {
     scaleFactor = ui.value;
   };

   ///cord shift
  webglLessonsUI.setupSlider("#cordShiftX", { value: (cordShiftX), slide: updateX, step:0.01, min: -1, max: 1 });
  function updateX(event, ui) {
    cordShiftX = (ui.value);
  }
  webglLessonsUI.setupSlider("#cordShiftY", { value: (cordShiftY), slide: updateY, step:0.01, min: -1, max: 1 });
  function updateY(event, ui) {
    cordShiftY = (ui.value);
  }
  webglLessonsUI.setupSlider("#cordShiftZ", { value: (cordShiftZ), slide: updateZ, step:0.01, min: -10, max: 0 });
  function updateZ(event, ui) {
    cordShiftZ = (ui.value);
  }

  //rotate 
  webglLessonsUI.setupSlider("#rotateX", { value: (rotateX), slide: updateRotateX, step: 0.02, min: 0, max: 180 });
  function updateRotateX(event, ui) {
    rotateX = (ui.value);
  }
  webglLessonsUI.setupSlider("#rotateY", { value: (rotateY), slide: updateRotateY, step: 0.02, min: 0, max: 180 });
  function updateRotateY(event, ui) {
    rotateY = (ui.value);
  }
  webglLessonsUI.setupSlider("#rotateZ", { value: (rotateZ), slide: updateRotateZ, step: 0.02, min: 0, max: 180 });
  function updateRotateZ(event, ui) {
    rotateZ = (ui.value);
  }
 //shininess
 webglLessonsUI.setupSlider("#shininess", { value: (rotateZ), slide: updateshine, step: 0.02, min: 5, max: 100 });
 function updateshine(event, ui) {
   materialShininess = (ui.value);
 }
 //projection
 webglLessonsUI.setupSlider("#projection", { value: (rotateZ), slide: updateProjection, step: 1, min: 0, max: 1,name:"Projection 1=ortho 0=perspective" });
 function updateProjection(event, ui) {
   if(ui.value == 0)
   {
      projectionMatrix = ProjectionPerspective(projectionMatrix);
   }
   else
   {
      projectionMatrix = ProjectionOrtho(projectionMatrix);
   }
 }

   var colorPicker = document.querySelector("#shapeColor");
  colorPicker.addEventListener("input", updateFirst, false);
  function updateFirst(event) {
   materialDiffuse[0] = hexToRgb(event.target.value).r / 255;
   materialDiffuse[1] = hexToRgb(event.target.value).g / 255;
   materialDiffuse[2] = hexToRgb(event.target.value).b / 255;
  }

   //----

   window.onload = function init() {
      canvas = document.getElementById("canvas");

      gl = canvas.getContext('webgl2');
      if (!gl) alert("WebGL 2.0 isn't available");

      webglUtils.resizeCanvasToDisplaySize(gl.canvas);

      // Tell WebGL how to convert from clip space to pixels
      gl.viewport(0, 0, gl.canvas.height, gl.canvas.height);

      //gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(1.0, 1.0, 1.0, 1.0);

      gl.enable(gl.DEPTH_TEST);

      //
      //  Load shaders and initialize attribute buffers
      //
      program = initShaders(gl, "vertex-shader", "fragment-shader");
      gl.useProgram(program);

      colorCube();

      var nBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);

      var normalLoc = gl.getAttribLocation(program, "aNormal");
      gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(normalLoc);

      var vBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, flatten(positionsArray), gl.STATIC_DRAW);

      var positionLoc = gl.getAttribLocation(program, "aPosition");
      gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(positionLoc);

      thetaLoc = gl.getUniformLocation(program, "theta");

      viewerPos = vec3(0.0, 0.0, -20.0);

      
      projectionMatrix = ProjectionPerspective(projectionMatrix);
      
      

     
      
      var ambientProduct = mult(lightAmbient, materialAmbient);
     
      var specularProduct = mult(lightSpecular, materialSpecular);

      document.getElementById("ButtonX").onclick = function () { axis = xAxis; };
      document.getElementById("ButtonY").onclick = function () { axis = yAxis; };
      document.getElementById("ButtonZ").onclick = function () { axis = zAxis; };
      document.getElementById("ButtonT").onclick = function () { flag = !flag; };

      gl.uniform4fv(gl.getUniformLocation(program, "uAmbientProduct"),
         ambientProduct);
      
      gl.uniform4fv(gl.getUniformLocation(program, "uSpecularProduct"),
         specularProduct);
      gl.uniform4fv(gl.getUniformLocation(program, "uLightPosition"),
         lightPosition);

      render();
   }

   var render = function () {
      

      var scaleMat = mat4(scaleFactor,0,0,0,
                          0,scaleFactor,0,0,
                          0,0,scaleFactor,0,
                          0,0,0,1);
      var translationMat = mat4(1,0,0,cordShiftX,
                                0,1,0,cordShiftY,
                                0,0,1,cordShiftZ,
                                0,0,0,1);


      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      if (flag) theta[axis] += 1.0;

      modelViewMatrix = mat4();
      modelViewMatrix = mult( modelViewMatrix,scaleMat);
      modelViewMatrix = mult( modelViewMatrix,translationMat);
      modelViewMatrix = mult(modelViewMatrix, rotate(theta[xAxis]+ rotateX, vec3(1, 0, 0)));
      modelViewMatrix = mult(modelViewMatrix, rotate(theta[yAxis]+rotateY, vec3(0, 1, 0)));
      modelViewMatrix = mult(modelViewMatrix, rotate(theta[zAxis]+rotateZ, vec3(0, 0, 1)));

      

      gl.uniformMatrix4fv(gl.getUniformLocation(program,
         "uModelViewMatrix"), false, flatten(modelViewMatrix));

         var diffuseProduct = mult(lightDiffuse, materialDiffuse);
         gl.uniform4fv(gl.getUniformLocation(program, "uDiffuseProduct"),
         diffuseProduct);

         gl.uniform1f(gl.getUniformLocation(program,
            "uShininess"), materialShininess);

      gl.drawArrays(gl.TRIANGLES, 0, numPositions);


      requestAnimationFrame(render);
   }

}

//helpers
function hexToRgb(hex) {
   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   return result ? {
     r: parseInt(result[1], 16),
     g: parseInt(result[2], 16),
     b: parseInt(result[3], 16)
   } : null;
 }

 //change projection
 //
 var translationMat2 = mat4(1,0,0,0,
   0,1,0,0,
   0,0,1,-2,
   0,0,0,1);
 function ProjectionOrtho(projectionMatrix)
 {
    projectionMatrix = ortho(-1, 1, -1, 1, -100, 100);

   projectionMatrix  =mult(projectionMatrix,translationMat2);
         gl.uniformMatrix4fv(gl.getUniformLocation(program, "uProjectionMatrix"),
            false, flatten(projectionMatrix));
 }
 function ProjectionPerspective(projectionMatrix)
 {
   var fovy = 10000, aspect=1, near=0.01, far=100;
    projectionMatrix = perspective(fovy, aspect, near, far);

   projectionMatrix  =mult(projectionMatrix,translationMat2);
         gl.uniformMatrix4fv(gl.getUniformLocation(program, "uProjectionMatrix"),
            false, flatten(projectionMatrix));
 }
 //

shadedCube();
