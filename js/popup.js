$(document).ready(function(){
    var activeWebsite = chrome.extension.getBackgroundPage().getActiveWebsite();
    $("#popup-content").append("Active Website: " + activeWebsite);
});