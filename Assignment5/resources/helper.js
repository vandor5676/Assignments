function hexToRgbVec4(hex) {
    var arrBuff = new ArrayBuffer(4);
    var vw = new DataView(arrBuff);
    vw.setUint32(0,parseInt(hex, 16),false);
    var arrByte = new Uint8Array(arrBuff);
  
    return [arrByte[1]/255 , arrByte[2]/255 , arrByte[3]/255,1];
  }

  function computeMatrix(viewProjectionMatrix, translation, yRotation) {
    var matrix = m4.translate(viewProjectionMatrix,
        translation[0],
        translation[1],
        translation[2]);
    //matrix = m4.xRotate(matrix, xRotation);
    return m4.yRotate(matrix, yRotation);
  }
  function appleAnimation(viewProjectionMatrix, translation, yRotation) {
    var matrix = m4.translate(viewProjectionMatrix,
        translation[0],
        translation[1],
        translation[2]);
    //matrix = m4.xRotate(matrix, xRotation);
    return m4.yRotate(matrix, yRotation);
  }

  //return random number in range
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function eMod(x, n) {
    return x >= 0 ? (x % n) : ((n - (-x % n)) % n);
  }