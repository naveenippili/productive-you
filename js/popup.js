$(document).ready(function(){
    var activeTab = chrome.extension.getBackgroundPage().getActiveTab();
    $("#popup-content").append("Active Tab: " + activeTab);
});