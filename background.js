let isExtensionActive = false;

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "activate") {
    isExtensionActive = true;
  } else if (message.action === "deactivate") {
    isExtensionActive = false;
  }
});

// Monitor tab change events
chrome.tabs.onCreated.addListener(function (tab) {
    if (isExtensionActive) {
      // Find the current active tab
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0]) {
          // Redirect the new tab to the URL of the previous active tab
          chrome.tabs.update(tab.id, { url: tabs[0].url }, function (updatedTab) {
            // Play the video in the main tab
            const videoURL = chrome.runtime.getURL("imgs/funny_video.mp4");
            chrome.tabs.update(tabs[0].id, { url: videoURL });
          });
        }
      });
    }
  });
  
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (isExtensionActive && changeInfo.status === "loading" && tab.url.startsWith("http")) {
        const videoURL = chrome.runtime.getURL("imgs/funny_video.mp4");
        chrome.tabs.update(tab.id, { url: videoURL });
    }
  });