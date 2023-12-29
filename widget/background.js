console.log('background js executed');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.recordingStopped) {
    console.log('received in background js');
    chrome.tabs.create({ url: chrome.runtime.getURL('result.html') }, function (tab) {
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (tabId === tab.id && changeInfo.status === 'complete') {
          chrome.tabs.sendMessage(tab.id, { videoData: request.videoData });
          chrome.tabs.onUpdated.removeListener(listener);
        }
      });
    });
  }
});
