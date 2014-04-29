// Global variable to store the active tab url
var activeTabUrl = "";

// Global time expenditure map
var timeMap = {};

// Returns a map of time spent by the user on various websites
function getTimeExpenditureMap() {
    return timeMap;
}

// Returns the current website being used
function getActiveWebsite() {
    return extractDomain(activeTabUrl);
}

// Updating the ActiveTabUrl during initialization
updateActiveTabUrl();

// Registering for an interval of 1s to update the time map
window.setInterval(intervalListener, 1000);
function intervalListener () {
    updateTimeMap();
}

// Updates the timeMap
function updateTimeMap () {
    var currDomain = getActiveWebsite();
    if (timeMap[currDomain] == undefined) {
        timeMap[currDomain] = 1;
    } else {
        timeMap[currDomain] += 1;
    }
}

// Registering for onActivated event
// This is fired when the active tab changes
chrome.tabs.onActivated.addListener(function (activeInfo) {
    updateActiveTabUrl();
});

// Registering for onChanged event
// This is fired when the url of a tab changes
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    updateActiveTabUrl();
});

// Finds the current tab in the current window
// Updates the activeTabUrl global variable
function updateActiveTabUrl() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        if (tabs.length < 1) {
            activeTabUrl = null;
        } else {
            activeTabUrl = tabs[0].url;
        }
    });
}

// Extracts the domain name out of a full URL
function extractDomain(str) {
    // Removing the protocol and www prefixes
    var strList = str.split(":\/\/");
    if (strList.length > 1) {
        str = strList[1];
    } else {
        str = strList[0];
    }
    str = str.replace(/www\./g,'');
    
    // Extracting the domain name from full URL
    var domainName = str.split('\/')[0];
    return domainName;
}