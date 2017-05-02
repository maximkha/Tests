var SE = {};

SE.SageEngine = function(_mc){
  this.cx=0;this.cy=0;this.cz=0;this.cphi=0;
  this.Objs = new Array();
  this.Can = _mc;

  this.phiView = 0.4;
  this.thetaView = 0.4;
  this.rDistance = 200;

  this.load = function(JsonData){
    this.Objs = JSON.parse(JsonData);
  };

  this.serializeWorld = function(){
    return JSON.stringify(this.Objs);
  };

  this.setCamera = function(_cx,_cy,_cz,_cphi){
    this.cx = _cx;
    this.cy = _cy;
    this.cz = _cz;
    this.cphi = _cphi;
  };

  this.SubPhi = function(phi1,phi2){
    var dphi = phi1 - phi2;
    if (dphi<-Math.PI) dphi += 2*Math.PI;
    if (dphi>=Math.PI) dphi -= 2*Math.PI;
    return dphi;
  };

  this.compareFunction = function(a,b){
    return b.d2 - a.d2;
  };

  this.render = function(){
    var R = new Array();
    var Self = this;  

    // view field
    var vmin = 20; var vmax = 520;
    var wmin = 20; var wmax = 520;

    this.Objs.forEach(function(Obj){

      // corners

      var dx = Obj.w/2; var dy = Obj.h/2;
      var z1 = Obj.z + dx*Math.cos(Obj.phi + Math.PI/2);
      var x1 = Obj.x + dx*Math.sin(Obj.phi + Math.PI/2);
      var y1 = Obj.y + dy;
      var z2 = Obj.z + dx*Math.cos(Obj.phi - Math.PI/2);
      var x2 = Obj.x + dx*Math.sin(Obj.phi - Math.PI/2);
      var y2 = Obj.y - dy;

      // phi viewing angle

      var phi1 = Math.atan2(x1-Self.cx, z1-Self.cz);
      var phi2 = Math.atan2(x2-Self.cx, z2-Self.cz);
      // make sure that phi2>phi1
      if (Self.SubPhi(phi2,phi1)<0) {
	var temp = phi1; phi1 = phi2; phi2 = temp;
	temp = x1; x1 = x2; x2 = temp;
	temp = z1; z1 = z2; z2 = temp;
      }
      // adjust phi to camera angle
      var cphi = Self.cphi; if (cphi>=Math.PI) cphi -= 2*Math.PI;
      phi1 = Self.SubPhi(phi1,cphi);
      phi2 = Self.SubPhi(phi2,cphi);
      // view range
      var phi_view = Self.phiView * Math.PI/2;
      var is_visible = true;
      // verify if phi1..phi2 covers transition region +pi <=> -pi
      if (phi1>0 && phi2<0) { // transition
	if (phi1<phi_view) {
	  phi2 = phi_view;
	} else if (phi2>-phi_view) {
	  phi1 = -phi_view;
	} else {
	  is_visible = false;
	}
      } else { // no transition
	if (phi1<phi_view && phi2>-phi_view) {
	  if (phi2>phi_view) phi2 = phi_view;
	  if (phi1<-phi_view) phi1 = -phi_view;
	} else {
	  is_visible = false;
	}
      }

      // theta view angle

      var theta11 = Math.atan((y1-Self.cy)/Math.sqrt(Math.pow(z1-Self.cz,2) + Math.pow(x1-Self.cx,2)));
      var theta12 = Math.atan((y2-Self.cy)/Math.sqrt(Math.pow(z1-Self.cz,2) + Math.pow(x1-Self.cx,2)));
      var theta21 = Math.atan((y1-Self.cy)/Math.sqrt(Math.pow(z2-Self.cz,2) + Math.pow(x2-Self.cx,2)));
      var theta22 = Math.atan((y2-Self.cy)/Math.sqrt(Math.pow(z2-Self.cz,2) + Math.pow(x2-Self.cx,2)));
      // view range in theta
      var theta_view = Self.thetaView * Math.PI/2;

      // distance to the object
      var dist = Math.sqrt(Math.pow(Obj.z-Self.cz,2) + Math.pow(Obj.x-Self.cx,2));
      // max visible depth
      if (dist>Self.rDistance) is_visible = false;

      // draw if visible

      if (is_visible) {
	// convert angles to canvas points
	var v1 = vmin + (phi1+phi_view)/(2*phi_view)*(vmax-vmin);
	var v2 = vmin + (phi2+phi_view)/(2*phi_view)*(vmax-vmin);
	var w11 = wmin + (theta11+theta_view)/(2*theta_view)*(wmax-wmin);
	var w12 = wmin + (theta12+theta_view)/(2*theta_view)*(wmax-wmin);
	var w21 = wmin + (theta21+theta_view)/(2*theta_view)*(wmax-wmin);
	var w22 = wmin + (theta22+theta_view)/(2*theta_view)*(wmax-wmin);
        R.push(new SE.types.v2d(v1,w11, v2,w21, v2,w22, v1,w12, dist));
      }
    });
    R.sort(Self.compareFunction);
    R.forEach(function(l){
      Self.Can.line(l.x,l.y);
      Self.Can.line(l.x1,l.y1);
      Self.Can.line(l.x2,l.y2);
      Self.Can.line(l.x3,l.y3);
      Self.Can.line(l.x,l.y);

      var depth = Math.round(l.d2); if (depth>255) depth = 255;
      var icolor = 65536*(255-depth) + 256*0 + 0;
      var color = "#"+("000000" + icolor.toString(16)).substr(-6);
      //Self.Can.drawlines(true,color);
      Self.Can.drawlines(true,color);
      
      //var oft = (1/Self.Can.C2D.lineWidth);
      Self.Can.C2D.miterLimit=1;
      Self.Can.line(l.x,l.y);
      Self.Can.line(l.x1,l.y1);
      Self.Can.line(l.x2,l.y2);
      Self.Can.line(l.x3,l.y3);
      Self.Can.line(l.x,l.y);

      Self.Can.drawlines(false,"black");
    });
  };
};

SE.types = {};

SE.types.v2d = function(_x,_y,_x1,_y1,_x2,_y2,_x3,_y3,_d2){
  this.x = _x;
  this.y = _y;
  this.x1 = _x1;
  this.y1 = _y1;
  this.x2 = _x2;
  this.y2 = _y2;
  this.x3 = _x3;
  this.y3 = _y3;
  this.d2 = _d2;
}

SE.types.polygon = function(_x,_y,_z,_w,_h,_phi){
  this.x = _x;
  this.y = _y;
  this.z = _z;
  this.w = _w;
  this.h = _h;
  this.phi = _phi;
}

SE.types.rect = function(_x1,_y1,_x2,_y2){
  this.x1 = _x1;
  this.y1 = _y1;
  this.x2 = _x2;
  this.y2 = _y2;
};
