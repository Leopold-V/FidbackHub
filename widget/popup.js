document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('captureButton').addEventListener('click', function () {
    chrome.tabs.captureVisibleTab({ format: 'png' }, function (dataUrl) {
      chrome.tabs.create({ url: chrome.runtime.getURL('result.html') }, function (tab) {
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
          if (tabId === tab.id && changeInfo.status === 'complete') {
            chrome.tabs.sendMessage(tab.id, { screenshotUrl: dataUrl });
            chrome.tabs.onUpdated.removeListener(listener);
          }
        });
      });
    });
  });
});
