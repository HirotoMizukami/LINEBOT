// LINEAPIから参照
var channel_access_token = PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN')

function sendLineMessageFromReplyToken(token, replyText) {

  var url = "https://api.line.me/v2/bot/message/reply";
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    "Authorization" : "Bearer " + channel_access_token
  };
  
  var postData = {
    "replyToken" : token,
    "messages" : [{
      "type" : "text",
      "text" : replyText
    }]
  };
  
  var options = {
    "method" : "POST",
    "headers" : headers,
    "payload" : JSON.stringify(postData)
  }

  return UrlFetchApp.fetch(url, options);
}

function setPosition(form){
  SpreadSheet.setToSheet(form.latitude, 'B1', '位置情報');
  SpreadSheet.setToSheet(form.longitude, 'B2', '位置情報');
  return;
}

// asyncとawaitで紐づかせる
//    await sleep(1000);
//  function sleep(milliseconds) {
//    return new Promise(resolve => setTimeout(resolve, milliseconds));
//  }