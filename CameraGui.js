var oldx = 0;
var MyStep = 0;
var MyMaxStep = 200;
var MyCan;

var Cx = 0;
var Cy = 0;
var Cz = 0;
var Speed = 1;

var phi = 0;
var cosphi = 0;
var sinphi = 0;

var key = new Array();

Util.Start(1,Start);
Util.Using("Drawing");

function MoveALF(m){
  //Left = true

  if (MyStep++==MyMaxStep) MyStep = 0;
  if (m) {MyStep--;MyStep--;}

  phi = 2*Math.PI * MyStep/MyMaxStep;
  cosphi = Math.cos(phi);
  sinphi = Math.sin(phi);
}

function Draw(){
  MyCan.clear();
  MyCan.text(0,100,"φ="+phi,true,"blue");
  MyCan.text(0,150,"Cosφ="+cosphi,true,"blue");
  MyCan.text(0,200,"Sinφ="+sinphi,true,"blue");
  MyCan.text(0,250,"CameraX="+Cx,true,"blue");
  MyCan.text(0,300,"CameraY="+Cy,true,"blue");
  MyCan.text(0,350,"CameraZ="+Cz,true,"blue");
}

function KeyPress(e){
  //console.log(e.which)
  var e = e || event;
  key[e.keyCode] = e.type == 'keydown';
  e.preventDefault();
}

function Start(){
  MyCan = document.getElementById('MyCanvas');
  Util.Drawing.InitDraw2d(MyCan);
  //MyCan.requestPointerLock = MyCan.requestPointerLock ||
  //                            MyCan.mozRequestPointerLock;

  //MyCan.exitPointerLock = MyCan.exitPointerLock    ||
  //                        MyCan.mozExitPointerLock;

  //MyCan.requestPointerLock();
  MyCan.C2D.lineWidth = 1;

  MyCan.width = window.innerWidth || document.body.clientWidth;
  MyCan.height = window.innerHeight || document.body.clientHeight;

  //MoveALF();
  MyCan.addEventListener('mousemove', MouseHndlr);
  //console.log(1);
  document.addEventListener('keydown', KeyPress,false);
  //console.log(2);
  document.addEventListener('keyup', KeyPress,false);
  KeyHandler();

  Draw();
}

function MouseHndlr(e){
  if (e.pageX < oldx) {
            //left
            MoveALF(true);
            Draw();
            MyCan.text(0,600,"t",true,"blue");
        } else if (e.pageX > oldx) {
            //Right
            MoveALF(false);
            Draw();
            MyCan.text(0,600,"f",true,"blue");
        }
        oldx = e.pageX;
}


function KeyHandler(){
  console.log("1");
  for (var i=0; i<key.length; i++){if(key[i]){
    switch(i) {
      case 87: //w key
      case 38: // up
        Cz+=Speed*cosphi;
        Cx+=Speed*sinphi;
        Draw();
      break;

      case 68: //d key
      case 37: // left
        MoveALF(true);
        Draw();
      break;

      case 65: //a key
      case 39: // right
        MoveALF(false);
        Draw();
      break;

      case 69:
        Cy--;
        Draw();
      break;
      //q
      case 81:
        Cy++;
        Draw();
      break;

      case 27:
        MyCan.exitPointerLock();
      break;
    }
  }}
  setTimeout(KeyHandler,1000/24);
}
