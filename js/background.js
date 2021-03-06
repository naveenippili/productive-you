// Global variable to store the active tab url
var activeTabUrl = "";

// Global variable to track whether the user is active or not
var isUserActive;

// Global time expenditure map
var timeMap = {};

// This variable stores when did the timeMap got refreshed last
var lastRefreshTimeStamp;

// Returns a map of time spent by the user on various websites
function getTimeExpenditureMap() {
    return timeMap;
}

// Returns the current website being used
function getActiveWebsite() {
    return extractDomain(activeTabUrl);
}

// Returns whether the user is active right now or not
function isUserActiveNow() {
    return isUserActive;
}

startUp();

// Do all the startup tasks
function startUp() {
    // Updating the ActiveTabUrl during initialization
    updateActiveTabUrl();

    // Register Events
    registerEvents();

    // Setting it to the initialization date by default
    // TODO: user chrome.storage api here
    lastRefreshTimeStamp = new Date();

    // Setting isUserActive as true while starting up
    isUserActive = true;
}

function registerEvents() {
    // Registering for onActivated event
    // This is fired when the active tab changes
    chrome.tabs.onActivated.addListener(function(activeInfo) {
        updateActiveTabUrl();
    });

    // Registering for onChanged event
    // This is fired when the url of a tab changes
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        updateActiveTabUrl();
    });

    // Registering for onFocusChanged event
    // This is fired when the active chrome window is changed.
    chrome.windows.onFocusChanged.addListener(function(windowId) {
        // This happens if all the windows are out of focus
        // Using this condition to infer that the user is inactive
        if (windowId === chrome.windows.WINDOW_ID_NONE) {
            isUserActive = false;
        } else {
            isUserActive = true;
        }
        updateActiveTabUrl();
    });

    // Registering for an interval of 1s
    window.setInterval(intervalListener, 1000);
}

// Listener for the timer
function intervalListener() {
    updateTimeMap();
    checkDateAndRefreshTimeMap();
}

// Updates the timeMap
function updateTimeMap() {
    var currDomain = getActiveWebsite();
    // Incrementing the timeSpent only if the user is active
    if (isUserActiveNow()) {
        if (timeMap[currDomain] == undefined) {
            timeMap[currDomain] = 1;
        } else {
            timeMap[currDomain] += 1;
        }
    }
}

// Returns the time of the day in which the stats have to refresh
function getRefreshTimePreference() {
    return {hours: 3, minutes: 0};
}

// Returns the last time when the timeMap has been refresehed
function getLastRefreshTime() {
    return lastRefreshTimeStamp;
}

// Checks whether its time to refresh the timeMap and refreshes it
function checkDateAndRefreshTimeMap() {
    var refreshTimePref = getRefreshTimePreference();
    var timeToRefresh = new Date();
    timeToRefresh.setHours(refreshTimePref.hours);
    timeToRefresh.setMinutes(refreshTimePref.minutes);
    timeToRefresh.setSeconds(0);
    if (new Date() > timeToRefresh && getLastRefreshTime() < timeToRefresh) {
        timeMap = {};
        lastRefreshTimeStamp = new Date();
    }
}

// Finds the current tab in the current window
// Updates the activeTabUrl global variable
function updateActiveTabUrl() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
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