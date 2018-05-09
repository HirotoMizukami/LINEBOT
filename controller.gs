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
  console.log(Function.name + start_log);
  
  try {
    keyword = searchKeywords[Math.floor(Math.random() * (searchKeywords.length + 1))];
    
    console.log(keyword);
    // keywordは適当に設定。
    imageUrl = getGoogleCustomSearchImage(keyword);
    imageUrl = urlShortener(imageUrl);
    
    sendLineImage(imageUrl);
  } finally {
    console.log(Function.name + end_log);
  }  
  return;
}
