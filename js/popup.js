$(document).ready(function(){
    populateCurrentWebsite();
    populateTopWebsiteList();
});

function populateCurrentWebsite() {
    var activeWebsite = chrome.extension.getBackgroundPage().getActiveWebsite();
    $("#popup-content #active-website").text(activeWebsite);
}

function populateTopWebsiteList() {
    var top10Websites = getTop10Websites();
    var table = $('#time-spent-table')
    table.empty();
    table.append('<tr><th>Website</th><th>Time Spent</th></tr>');
    $.each(top10Websites, function (index, value) {
        table.append('<tr><td>' + value.website + 
                        '</td><td>' + value.readableTime + '</td></tr>');
    });
}

function getTop10Websites() {
    var timeSpentMap = chrome.extension.getBackgroundPage().getTimeExpenditureMap();
    var timeSpentArray = $.map(timeSpentMap, 
                            function(value, key) {
                                var timeSpentElement = Object();
                                timeSpentElement.website = key;
                                timeSpentElement.timeSpent = value;
                                timeSpentElement.readableTime = getReadableTime(value);
                                return timeSpentElement;
                            });
    timeSpentArray.sort(function(a,b) {
                            return b.timeSpent - a.timeSpent;
                        });

    return timeSpentArray.slice(0,10);
}

function getReadableTime(totalSeconds) {
    var seconds = totalSeconds % 60;
    var minutes = (Math.floor(totalSeconds/60))%60;
    var hours = (Math.floor(totalSeconds/3600));
    var readableTime = '';
    if (hours > 0) 
        readableTime += hours + 'h ';
    if (minutes > 0)
        readableTime += minutes + 'm ' ;
    readableTime += seconds + 's ';
    return readableTime;
}