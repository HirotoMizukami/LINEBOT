function doGet(e) {
   var t = HtmlService.createTemplateFromFile("index.html");
   return t.evaluate();
}

function doPost(e) {
  var webhookData = JSON.parse(e.postData.contents).events[0];
  var message,replyToken;
  
  message = webhookData.message.text;
  replyToken = webhookData.replyToken;
  return sendLineMessageFromReplyToken(replyToken, message);
}

