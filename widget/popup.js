document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('captureButton').addEventListener('click', function () {
    chrome.tabs.captureVisibleTab({ format: 'png' }, function (dataUrl) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTabId = tabs[0].id;
        chrome.tabs.sendMessage(currentTabId, { screenshotUrl: dataUrl, apiKey: "OX3bW6wtUaz/9zmf0KWvLu/KrUgVswf2kZy0kNR+7lBRHzyp0l6VCNanJkbBmjd5N/rcdP99sc6mbXhxquZmFg==" });
      });
    });
  });
});

/*
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('captureButton').addEventListener('click', function () {
    chrome.tabs.captureVisibleTab({ format: 'png' }, function (dataUrl) {
      // Open a new tab with the React app
      chrome.tabs.create({ url: chrome.runtime.getURL('result.html') }, function (tab) {
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
          if (tabId === tab.id && changeInfo.status === 'complete') {
            chrome.tabs.sendMessage(tab.id, { screenshotUrl: dataUrl, apiKey: "OX3bW6wtUaz/9zmf0KWvLu/KrUgVswf2kZy0kNR+7lBRHzyp0l6VCNanJkbBmjd5N/rcdP99sc6mbXhxquZmFg==" });
            chrome.tabs.onUpdated.removeListener(listener);
          }
        });
      });
    });
  });
});
*/