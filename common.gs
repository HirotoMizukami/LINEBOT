// LINEAPIから参照
var channel_access_token = PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN');
var user_id = PropertiesService.getScriptProperties().getProperty('USER_ID');

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

/**
  備考：googleのCSEを使用しているので、一日に100件以上のリクエストを飛ばすと有料になる。
       cronで使用する予定なので、必要以上に使わないように注意すること。
  return:画像のURL
*/
function getGoogleCustomSearchImage(keyword){
  var API_KEY = PropertiesService.getScriptProperties().getProperty('SEARCH_API_KEY');
  var CSE_ID = PropertiesService.getScriptProperties().getProperty('SEARCH_CSE_ID');
  
  // keywordは一旦固定で”猫”にする。cat is cute!
  keyword = encodeURIComponent("猫");
  var uri = "https://www.googleapis.com/customsearch/v1?key=" + API_KEY + "&cx=" + CSE_ID + "&q=" + keyword + "&searchType=image"
  
  var response = UrlFetchApp.fetch(uri);
  var json = JSON.parse(response);
  var random_params = Math.floor(Math.random() * json["items"].length);
  
  var result = json["items"][random_params]["link"];
  return result;
}

function sendLineImage(imageUrl) {

  var url = "https://api.line.me/v2/bot/message/push";
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    "Authorization" : "Bearer " + channel_access_token
  };
  
  var postData = {
    "to" : user_id,
    "messages" : [{
      "type" : "image",
      "originalContentUrl" : imageUrl,
      "previewImageUrl" : imageUrl
    }]
  };  
  
  var options = {
    "method" : "POST",
    "headers" : headers,
    "payload" : JSON.stringify(postData)
  };
  
  return UrlFetchApp.fetch(url, options);
}

// asyncとawaitで紐づかせる
//    await sleep(1000);
//  function sleep(milliseconds) {
//    return new Promise(resolve => setTimeout(resolve, milliseconds));
//  }