var start_log = "開始";
var end_log = "終了";

// LINEAPIから参照
var channel_access_token = PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN');
var user_id = PropertiesService.getScriptProperties().getProperty('USER_ID');
var API_KEY = PropertiesService.getScriptProperties().getProperty('SEARCH_API_KEY');
var CSE_ID = PropertiesService.getScriptProperties().getProperty('SEARCH_CSE_ID');

var searchKeywords =[
  "犬",
  "猫",
  "動物",
  "ハシビロコウ",
  "アルクェイド" // 嫁
];

