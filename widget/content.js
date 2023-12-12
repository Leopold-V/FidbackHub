chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.screenshotUrl) {
      const scriptElement = document.createElement('script');
      scriptElement.id = 'script_widget';
      scriptElement.setAttribute('data-screenshot', request.screenshotUrl)
      scriptElement.setAttribute('data-key', request.apiKey)
      scriptElement.src = chrome.runtime.getURL('/dist/fidbackhub-widget.js');
      document.body.appendChild(scriptElement);
    } else {
      console.error('Screenshot URL is missing.');
    }
  });
  