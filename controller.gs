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

function getImageToLine(){
  var keyword, imageUrl;
  // keywordは適当に設定。
  imageUrl = getGoogleCustomSearchImage(keyword);

  return sendLineImage(imageUrl);
}
