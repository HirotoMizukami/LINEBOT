function execTrigger(){
  delTrigger();
  setTrigger();
}
 
function setTrigger(){
  var setTime = new Date();
  var hour = setTime.getHours() + 1;
  var minutes = 1;

  setTime.setHours(hour - 1);
  setTime.setMinutes(minutes);
  
  ScriptApp.newTrigger('execTrigger').timeBased().at(setTime).create();
  
  // 6-23時の間動くようにする。
  if (hour <= 7 || 24 <= hour){
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