"use strict";

function main() {
  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  var canvas = document.querySelector("#canvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  // creates buffers with position, normal, texcoord, and vertex color
  // data for primitives by calling gl.createBuffer, gl.bindBuffer,
  // and gl.bufferData
  var coneBufferInfo   = primitives.createTruncatedConeWithVertexColorsBufferInfo(gl, 10, 0, 20, 12, 1, true, false);

  // setup GLSL program
  var programInfo = webglUtils.createProgramInfo(gl, ["vertex-shader-3d", "fragment-shader-3d"]);

  function degToRad(d) {
    return d * Math.PI / 180;
  }

  var fieldOfViewRadians = degToRad(60);
  var cameraHeight = 50;
  
  // Uniforms for each object.
  var coneUniforms = {
    u_colorMult: [0.5, 0.5, 1, 1],
    u_matrix: m4.identity(),
  };
  
  
  
  function computeMatrix(viewProjectionMatrix, translation, xRotation, yRotation,zRotation) {
    var matrix = m4.translate(viewProjectionMatrix,
        translation[0],
        translation[1],
        translation[2]);
        matrix = m4.xRotate(matrix, xRotation);
        matrix = m4.yRotate(matrix, yRotation);
        return m4.zRotate(matrix, zRotation);
    }
    
  requestAnimationFrame(drawScene);

  
  // Setup a ui.
  //
  var coneHeight = 20;
  var coneBaseWidth = 10;

  var cordShiftX = 0;
  var cordShiftY = 0;
  var cordShiftZ = 0;

  var rotateX = 0;
  var rotateY =0;
  var rotateZ =0;
  
  //cone propertys
  webglLessonsUI.setupSlider("#ConeHeight", {value: (coneHeight), slide:updateBase , min: -40, max: 40});
  function updateBase(event, ui) {
    coneHeight = (ui.value);
    drawScene();
  }
  webglLessonsUI.setupSlider("#ConeBaseWidth", {value: (coneBaseWidth), slide:updateHeight, min: -40, max: 40});
   function updateHeight(event, ui) {
    coneBaseWidth = (ui.value);
    drawScene();
  }
  //cord shift
  webglLessonsUI.setupSlider("#cordShiftX", {value: (cordShiftX), slide:updateX, min: -40, max: 40});
   function updateX(event, ui) {
    cordShiftX = (ui.value);
    drawScene();
  }
  webglLessonsUI.setupSlider("#cordShiftY", {value: (cordShiftY), slide:updateY, min: -40, max: 40});
   function updateY(event, ui) {
    cordShiftY = (ui.value);
    drawScene();
  }
  webglLessonsUI.setupSlider("#cordShiftZ", {value: (cordShiftZ), slide:updateZ, min: -40, max: 40});
   function updateZ(event, ui) {
    cordShiftZ = (ui.value);
    drawScene();
  }

  //rotate 
  webglLessonsUI.setupSlider("#rotateX", {value: (rotateX), slide:updateX, step:0.02, min: 0, max: 2*3.14});
   function updateX(event, ui) {
    rotateX = (ui.value);
    drawScene();
  }
  webglLessonsUI.setupSlider("#rotateY", {value: (rotateY), slide:updateY,step:0.02, min: 0, max: 2*3.14});
   function updateY(event, ui) {
    rotateY = (ui.value);
    drawScene();
  }
  webglLessonsUI.setupSlider("#rotateZ", {value: (rotateZ), slide:updateZ,step:0.02, min: 0, max:  2*3.14});
   function updateZ(event, ui) {
    rotateZ = (ui.value);
    drawScene();
  }


  // Draw the scene.
  function drawScene(time) {
    time *= 0.0005;

    coneBufferInfo   = primitives.createTruncatedConeWithVertexColorsBufferInfo(gl, coneBaseWidth, 0, coneHeight, 12, 1, true, false);

    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    // Clear the canvas AND the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //camera
    //------
    // Compute the projection matrix
    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var projectionMatrix =
        m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

    // Compute the camera's matrix using look at.
    var cameraPosition = [0, 0, 100];
    var target = [0, 0, 0];
    var up = [0, 1, 0];
    var cameraMatrix = m4.lookAt(cameraPosition, target, up);

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);

    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
    //-----



    gl.useProgram(programInfo.program);

    // ------ Draw the cone --------
    var coneXRotation   =  rotateX;
    var coneYRotation   =  rotateY;
    var coneTranslation   = [ cordShiftX, cordShiftY, cordShiftZ];

    // Setup all the needed attributes.
    webglUtils.setBuffersAndAttributes(gl, programInfo, coneBufferInfo);

    coneUniforms.u_matrix = computeMatrix(
        viewProjectionMatrix,
        coneTranslation,
        coneXRotation,
        coneYRotation,
        rotateZ);

    // Set the uniforms we just computed
    webglUtils.setUniforms(programInfo, coneUniforms);

    gl.drawArrays(gl.TRIANGLES, 0, coneBufferInfo.numElements);

    requestAnimationFrame(drawScene);
  }
}

main();
