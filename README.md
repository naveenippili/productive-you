productive-you
==============

A chrome extension which is aimed at increasing the productivity of the user.

####Features:
* Tracks the time you have spent on various websites. 
* Displays the top 10 websites on which you have spent your time.

####How To Test It:
* Clone this or your forked repo into your machine
* Open the chrome extensions page or type "chrome://extensions" in your omnibox
* Make sure "Developer Mode" is checked at the top right corner
* Click "Load Unpacked Extension" button
* Navigate to the directory where you have cloned the repo and select it
* The extension should start running

####TODO:
* Find all the events on which the activeTabUrl needs to be updated
* Check if the currentWindow is in focus or not while updating the timeSpent
* Reset the timeMap everyday at some time
* Store the data using the chrome.storage api
* Persist user preferences