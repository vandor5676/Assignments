//initlalises button listeners
function initButtons() {
    //rotate
    document.getElementById("xButtonRotate").onclick = function () {
        axis = xAxis;
        theta[axis] += 10.0;
    };
    document.getElementById("yButtonRotate").onclick = function () {
        axis = yAxis;
        theta[axis] += 10.0;
    };
    document.getElementById("zButtonRotate").onclick = function () {
        axis = zAxis;
        theta[axis] += 10.0;
    };
    document.getElementById("-xButtonRotate").onclick = function () {
        axis = xAxis;
        theta[axis] += -10.0;
    };
    document.getElementById("-yButtonRotate").onclick = function () {
        axis = yAxis;
        theta[axis] += -10.0;
    };
    document.getElementById("-zButtonRotate").onclick = function () {
        axis = zAxis;
        theta[axis] += -10.0;
    };


    //Translate
    document.getElementById("xButtonTranslate").onclick = function () {
        axis = xAxis;
        translation[axis] += 0.1;
    };
    document.getElementById("yButtonTranslate").onclick = function () {
        axis = yAxis;
        translation[axis] += 0.1;
    };
    document.getElementById("zButtonTranslate").onclick = function () {
        axis = zAxis;
        translation[axis] += 0.1;
    };
    document.getElementById("-xButtonTranslate").onclick = function () {
        axis = xAxis;
        translation[axis] += -0.1;
    };
    document.getElementById("-yButtonTranslate").onclick = function () {
        axis = yAxis;
        translation[axis] += -0.1;
    };
    document.getElementById("-zButtonTranslate").onclick = function () {
        axis = zAxis;
        translation[axis] += -0.1;
    };


    //Scale
    document.getElementById("xButtonScale").onclick = function () {
        axis = xAxis;
        scale[axis] += 0.1;
    };
    document.getElementById("yButtonScale").onclick = function () {
        axis = yAxis;
        scale[axis] += 0.1;
    };
    document.getElementById("zButtonScale").onclick = function () {
        axis = zAxis;
        scale[axis] += 0.1;
    };
    document.getElementById("-xButtonScale").onclick = function () {
        axis = xAxis;
        scale[axis] += -0.1;
    };
    document.getElementById("-yButtonScale").onclick = function () {
        axis = yAxis;
        scale[axis] += -0.1;
    };
    document.getElementById("-zButtonScale").onclick = function () {
        axis = zAxis;
        scale[axis] += -0.1;
    };
    
    // affine transformation order buttons
    document.getElementById("affineButton1").onclick = function () {
        affine1 = flatten(mult(mat1 ,mat2));

    };
    document.getElementById("affineButton2").onclick = function () {
         affine1 = flatten(mult(mat2 , mat1));
    };



    //reset
    document.getElementById("reset").onclick = function () {
         axis = 0;
         theta = [0, 0, 0];
         translation = [0, 0, 0];
         scale = [1, 1, 1];
         affine1 = flatten(mat4());
         affine2 = flatten(mat4());
    };
}
