$(document).ready(function(){
    var activeWebsite = chrome.extension.getBackgroundPage().getActiveWebsite();
    $("#popup-content #active-website").text(activeWebsite);
});