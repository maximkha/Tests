var oldx = 0;
var MyStep = 0;
var MyMaxStep = 200;
var MyCan;

var Cx = 0;
var Cy = 0;
var Cz = 0;
var Speed = 5;//1;
var tSpeed = 3.75;

var phi = 0;
var cosphi = 1;
var sinphi = 0;

var key = new Array();

Util.Start(1,Start);
Util.Using("Drawing");

var MySage;

function MoveALF(m){
  //Left = true 
  //if ((MyStep+=tSpeed)>MyMaxStep) MyStep = 0;
  if (m) MyStep -= tSpeed;
  if (!m) MyStep += tSpeed;
  if(MyStep>MyMaxStep) MyStep=0;
  if(MyStep<0) MyStep = MyMaxStep;
  //console.log(MyStep);


  phi = 2*Math.PI * MyStep/MyMaxStep;
  cosphi = Math.cos(phi);
  sinphi = Math.sin(phi);
}

function myround(a, p)
{
  return Math.round(a*p)/p;
}

function Draw(){
  MyCan.clear();
  var x = 10, xstep = 20;

  MySage.setCamera(Cx,Cy,Cz,phi);
  var RectArray = MySage.render();

  MyCan.text(0,x+=xstep,"φ="+myround(phi,100),true,"blue");
  MyCan.text(0,x+=xstep,"CameraX="+myround(Cx,10),true,"blue");
  MyCan.text(0,x+=xstep,"CameraY="+myround(Cy,10),true,"blue");
  MyCan.text(0,x+=xstep,"CameraZ="+myround(Cz,10),true,"blue");

}

function KeyPress(e){
  //console.log(e.which)
  var e = e || event;
  key[e.keyCode] = e.type == 'keydown';
  //e.preventDefault();
  if(e.keyCode==38)e.preventDefault();
  if(e.keyCode==37)e.preventDefault();
  if(e.keyCode==39)e.preventDefault();
  if(e.keyCode==40)e.preventDefault();
}

function Start(){
  MyCan = document.getElementById('MyCanvas');
  Util.Drawing.InitDraw2d(MyCan);
  //MyCan.requestPointerLock = MyCan.requestPointerLock ||
  //                            MyCan.mozRequestPointerLock;

  //MyCan.exitPointerLock = MyCan.exitPointerLock    ||
  //                        MyCan.mozExitPointerLock;

  //MyCan.requestPointerLock();
  //MyCan.C2D.lineWidth = 3;
  MyCan.C2D.lineJoin = "miter";
  MyCan.C2D.miterLimit = 1;

  MyCan.width = window.innerWidth || document.body.clientWidth;
  MyCan.height = window.innerHeight || document.body.clientHeight;

  MyCan.font("16px serif");
  document.addEventListener('keydown', KeyPress,true);
  document.addEventListener('keyup', KeyPress,true);
  KeyHandler();

  MySage = new SE.SageEngine(MyCan);
  //MySage.Objs.push(new SE.types.polygon(0,0,100,30,30,0));
  MySage.load(Data);

  MyCan.C2D.lineWidth = 3;

  Draw();
}

function KeyHandler(){
  //console.log("1");
  for (var i=0; i<key.length; i++){if(key[i]){
    switch(i) {
      case 87: //w key
      case 38: // up
        Cz+=Speed*cosphi;
        Cx+=Speed*sinphi;
        Draw();
      break;

      case 65: //a key
      case 37: // left
        MoveALF(true);
        Draw();
      break;

      case 68: //d key
      case 39: // right
        MoveALF(false);
        Draw();
      break;

      case 83: //s key
      case 40: // down
        Cz-=Speed*cosphi;
        Cx-=Speed*sinphi;
        Draw();
      break;

      //e
      case 69:
        Cy++;
        Draw();
      break;
      //q
      case 81:
        Cy--;
        Draw();
      break;
      //x
      case 88:
        Cy = 0;
        Draw();
      break;
      //c
      case 67:
        Cz-=Speed*sinphi;
        Cx+=Speed*cosphi;
	Draw();
      break;
      //z
      case 90:
        Cz+=Speed*sinphi;
        Cx-=Speed*cosphi;
	Draw();
      break;
      //0
      case 48:
        Cx = 0;
        Cy = 0;
        Cz = 0;
	phi = 0;
	cosphi = 1;
	sinphi = 0;
        Draw();
      break;
      case 70:
        openMenu();
      break;
    }
  }}
  setTimeout(KeyHandler,1000/24);
}
