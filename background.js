chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
    chrome.storage.local.set({ history: [] });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'addHistory') {
    chrome.storage.local.get({ history: [] }, function (result) {
      let history = result.history || [];  // Ensure history is initialized
      if (history.length >= 5) {
        history.shift(); // Remove the oldest entry if the history reaches 5 items
      }
      history.push(request.text);
      chrome.storage.local.set({ history: history });
      sendResponse({});  // Send an empty response synchronously
    });
    return true;  // Indicates that sendResponse will be called asynchronously
  } else if (request.action === 'getHistory') {
    chrome.storage.local.get({ history: [] }, function (result) {
      sendResponse({ history: result.history });
    });
    return true;  // Indicates that sendResponse will be called asynchronously
  } else if (request.action === 'clearHistory') {
    chrome.storage.local.get({ history: [] }, function (result) {
      let history = result.history || [];  // Ensure history is initialized
      history=[]
      chrome.storage.local.set({ history: history });
      sendResponse({});  // Send an empty response synchronously
    });
    return true;    // Indicates that sendResponse will be called asynchronously
  }
});
