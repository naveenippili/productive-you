productive-you
==============

A chrome extension which is aimed at increasing the productivity of the user.

####Features:
* Tracks the time you have spent on various websites. 
* Displays the top 10 websites on which you have spent your time on that day.
* Disables the timer automatically when the user is not using the browser.


####How To Test It:
* Clone this or your forked repo into your machine
* Open the chrome extensions page or type "chrome://extensions" in your omnibox
* Make sure "Developer Mode" is checked at the top right corner
* Click "Load Unpacked Extension" button
* Navigate to the directory where you have cloned the repo and select it
* The extension should start running

####TODO:
* Store the tracking data using the chrome.storage api like
    * timeMap
    * lastRefreshTime
* Persist user preferences like
    * timeToRefresh