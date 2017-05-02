var FovMenu='<h2>Fov</h2><label for="thetaText">Theta (Radians):</label> <input id="thetaText" type="text"><br/><label for="phiText">Phi (Radians):</label> <input id="phiText" type="text"><br/><button type="button" onclick="setFov();">Ok</button>';
var MovementMenu='<h2>Movement</h2><label for="wsText">Walk Speed:</label> <input id="wsText" type="text"><br/><label for="tsText">Turn Speed:</label> <input id="tsText" type="text"><br/><button type="button" onclick="setMovement();">Ok</button>';
var RenderMenu='<h2>Rendering</h2><label for="dsText">Render Distance:</label> <input id="dsText" type="text"><br/><br/><button type="button" onclick="setRender();">Ok</button>';
var Close = '<button type="button" onclick="closeMenus();">Close</button>';

function SelectMenu(m){
  var sm = document.getElementById("SettingMenu");
  if(m==0){
    sm.innerHTML=FovMenu+Close;
    document.getElementById("thetaText").value = MySage.thetaView;
    document.getElementById("phiText").value = MySage.phiView;
  }
  if(m==1){
    sm.innerHTML=MovementMenu+Close;
    document.getElementById("wsText").value = Speed;
    document.getElementById("tsText").value = tSpeed;
  }
  if(m==2){
    sm.innerHTML=RenderMenu+Close;
    document.getElementById("dsText").value = MySage.rDistance;
  }
}

function toNumber(str){
  if(!isNaN(str)){
    return +str;
  }else{
    return -1;
  }
}

function closeMenus(){
  document.getElementById("SettingMenu").innerHTML="";
}

function setFov(){
  var T = toNumber(document.getElementById("thetaText").value);
  var P = toNumber(document.getElementById("phiText").value);
  if(T!=-1&&P!=-1){
    MySage.phiView = P;
    MySage.thetaView = T;
    document.getElementById("errorP").innerHTML="";
  }else{
    document.getElementById("SettingMenu").innerHTML+='<p id="errorP">Enter a Valid Number</p>';
  }
}

function setMovement(){
  var ws = toNumber(document.getElementById("wsText").value);
  var ts = toNumber(document.getElementById("tsText").value);
  if(ws!=-1&&ts!=-1){
    Speed = ws;
    tSpeed = ts;
    document.getElementById("errorP").innerHTML="";
  }else{
    document.getElementById("SettingMenu").innerHTML+='<p id="errorP">Enter a Valid Number</p>';
}
}

function setRender(){
  var ws = toNumber(document.getElementById("dsText").value);
  if(ws!=-1){
    MySage.rDistance=ws
    document.getElementById("errorP").innerHTML="";
  }else{
    document.getElementById("SettingMenu").innerHTML+='<p id="errorP">Enter a Valid Number</p>';
}
}

function openMenu(){
  document.getElementById("GameOptions").style.visibility = 'visible';
}

function closeMenu(){
   var elements = document.getElementById("GameMenu").options;

    for(var i = 0; i < elements.length; i++){
      elements[i].selected = false;
    }
  document.getElementById("GameOptions").style.visibility = 'hidden';
  window.focus();
}
closeMenu();
