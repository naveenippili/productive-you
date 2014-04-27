$(document).ready(function(){

    chrome.tabs.query( {}, function (tabs) {

        for (var i = 0; i< tabs.length; i++) {
            $("#popup-content").append(tabs[i].id + ": ");
            $("#popup-content").append(tabs[i].url);
            $("#popup-content").append($("<br/>"));
        }
    });

    var curTime = chrome.extension.getBackgroundPage().getCurrentTime();
    $("#popup-content").append("Current Time: " + curTime);
});