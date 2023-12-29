// record-controls.js

const port = chrome.runtime.connect({ name: 'controls' });

document.addEventListener('DOMContentLoaded', function () {
  let recording = false;
  let recordButton = document.getElementById('recordingControlButton');
  recordButton.addEventListener('click', async function () {
    if (!recording) {
      //chrome.runtime.sendMessage({ startRecording: true });
      port.postMessage({ startRecording: true });
    } else {
      port.postMessage({ stopRecording: true });
      //chrome.runtime.sendMessage({ stopRecording: true });
    }

    /*
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log(tabs);
      const activeTabId = tabs[0].id;
      if (!recording) {
        chrome.tabs.sendMessage(activeTabId, { startRecording: true });
      } else {
        chrome.tabs.sendMessage(activeTabId, { stopRecording: true });
      }
    });
    */
    recording = !recording;
    recordButton.textContent = recording ? 'Stop Recording' : 'Start Recording';
  });
});
