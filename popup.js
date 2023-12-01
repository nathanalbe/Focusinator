document.addEventListener("DOMContentLoaded", function () {
    const toggleExtension = document.getElementById("toggleExtension");
  
    // Load the extension state from chrome.storage
    chrome.storage.sync.get("isExtensionActive", function (data) {
      toggleExtension.checked = data.isExtensionActive || false;
    });
  
    toggleExtension.addEventListener("change", function () {
      // Store the extension state in chrome.storage
      chrome.storage.sync.set({ isExtensionActive: toggleExtension.checked });
  
      if (toggleExtension.checked) {
        chrome.runtime.sendMessage({ action: "activate" });
      } else {
        chrome.runtime.sendMessage({ action: "deactivate" });
      }
    });
  });