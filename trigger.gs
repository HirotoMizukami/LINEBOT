function execTrigger(){
  delTrigger();
  setTrigger();
}

/**
  備考：ScriptAppは過去日にTriggerを設定できない。なので、過去日に値をsetしようとすると現在日に補正される。
*/
function setTrigger(){
  var setTime = new Date();
  var nowTime = setTime;
  var hour = setTime.getHours() + 1;
  var minutes = 1;

  setTime.setHours(hour);
  setTime.setMinutes(minutes);
  
  // 自トリガーを設定しなおすため、ここで設定する。
  ScriptApp.newTrigger('execTrigger').timeBased().at(setTime).create();
  
  if (!isSetableTime(nowTime)) {
    return;
  }
  
  setTime.setMinutes(minutes - 1);  
  ScriptApp.newTrigger('getImageToLine').timeBased().at(setTime).create();
 }
 
function delTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for(var i=0; i < triggers.length; i++) {
    var triggerFunction = triggers[i].getHandlerFunction();
    if (triggerFunction == "execTrigger" || triggerFunction == "getImageToLine") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

function isSetableTime(date){
  var hour = date.getHours();
  // 6-23時の間動くようにする。
  if (hour < 6 || 23 < hour) {
    return false;
  }
  
  return true;
}