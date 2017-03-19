Util.Start(1,Myfun);
Util.Using("Drawing");

var MyCan;
var MyStep;
var MyMAxStep;

function Myfun() {

    MyCan = document.getElementById('MyCanvas');
    Util.Drawing.InitDraw2d(MyCan);
    MyCan.C2D.lineWidth = 1;

    MyCan.width = window.innerWidth || document.body.clientWidth;
    MyCan.height = window.innerHeight || document.body.clientHeight;

    MyStep = 0;
    MyMaxStep = 200;
    setInterval(Mypic, 100);
}

function Mypic() {

    if (MyStep++==MyMaxStep) MyStep = 0;

    MyCan.clear();

    var phi = 2*Math.PI * MyStep/MyMaxStep;
    var cosphi = Math.cos(phi);
    var sinphi = Math.sin(phi);

    var rx = 0.4; var ry = 0.2;
    var x0 = 0.5 + rx*cosphi; var y0 = 0.5 + ry*sinphi;
    var x1 = 0.5 - rx*sinphi; var y1 = 0.5 + ry*cosphi;
    var x2 = 0.5 - rx*cosphi; var y2 = 0.5 - ry*sinphi;
    var x3 = 0.5 + rx*sinphi; var y3 = 0.5 - ry*cosphi;

    var x4 = 0.5; var y4 = 0.1;
    var x5 = 0.5; var y5 = 0.9;

    var icolor = 65536*128 + 256*128 + 128; // 0x888888
    var hcolor = "#"+("000000" + icolor.toString(16)).substr(-6);

    MyCan.triangle(MyCan.x2u(x0),MyCan.y2v(y0),MyCan.x2u(x1),MyCan.y2v(y1),MyCan.x2u(x5),MyCan.y2v(y5),false,hcolor);
    MyCan.triangle(MyCan.x2u(x1),MyCan.y2v(y1),MyCan.x2u(x2),MyCan.y2v(y2),MyCan.x2u(x5),MyCan.y2v(y5),false,hcolor);
    MyCan.triangle(MyCan.x2u(x2),MyCan.y2v(y2),MyCan.x2u(x3),MyCan.y2v(y3),MyCan.x2u(x5),MyCan.y2v(y5),false,hcolor);
    MyCan.triangle(MyCan.x2u(x3),MyCan.y2v(y3),MyCan.x2u(x0),MyCan.y2v(y0),MyCan.x2u(x5),MyCan.y2v(y5),false,hcolor);

    MyCan.triangle(MyCan.x2u(x0),MyCan.y2v(y0),MyCan.x2u(x1),MyCan.y2v(y1),MyCan.x2u(x4),MyCan.y2v(y4),false,hcolor);
    MyCan.triangle(MyCan.x2u(x1),MyCan.y2v(y1),MyCan.x2u(x2),MyCan.y2v(y2),MyCan.x2u(x4),MyCan.y2v(y4),false,hcolor);
    MyCan.triangle(MyCan.x2u(x2),MyCan.y2v(y2),MyCan.x2u(x3),MyCan.y2v(y3),MyCan.x2u(x4),MyCan.y2v(y4),false,hcolor);
    MyCan.triangle(MyCan.x2u(x3),MyCan.y2v(y3),MyCan.x2u(x0),MyCan.y2v(y0),MyCan.x2u(x4),MyCan.y2v(y4),false,hcolor);
}
