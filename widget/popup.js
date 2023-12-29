let recording = false;
let controlsWindow;

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
  document.getElementById('startRecordButton').addEventListener('click', async function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTabId = tabs[0].id;
      chrome.tabs.sendMessage(activeTabId, { startRecording: true });
    });
  });
});

/*
let mediaRecorder;
let recordedChunks = [];

async function startRecording() {
  console.log(navigator.mediaDevices);
  console.log('start recording');
  const stream = await chrome.tabs.mediaDevices.getDisplayMedia({ video: { mediaSource: 'screen' } });
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    chrome.tabs.create({ url: url });
  };

  mediaRecorder.start();
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    console.log('stop recording');
    mediaRecorder.stop();
  }
}
*/
