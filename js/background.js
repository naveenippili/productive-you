var activeTab = "";
function getActiveTab() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        console.log("Insdie callback");
        if (tabs.length < 1) {
            activeTab = null;
        } else {
            activeTab = tabs[0].url;
        }
    });
    console.log("Before returning");
    return activeTab;
}