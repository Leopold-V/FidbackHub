chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.screenshotUrl) {
    const scriptElement = document.createElement('script');
    scriptElement.id = 'script_widget';
    scriptElement.setAttribute('data-screenshot', request.screenshotUrl);
    scriptElement.src = chrome.runtime.getURL('/dist/fidbackhub-widget.js');
    document.body.appendChild(scriptElement);
  }
  if (request.startRecording) {
    startRecording();
  }
  if (request.videoData) {
    const scriptElement = document.createElement('script');
    scriptElement.id = 'script_widget';
    scriptElement.setAttribute('data-video', request.videoData);
    scriptElement.src = chrome.runtime.getURL('/dist/fidbackhub-widget.js');
    document.body.appendChild(scriptElement);
  }
});

let mediaRecorder;
let recordedChunks = [];

async function startRecording() {
  console.log('start received');
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: 'screen' },
    preferCurrentTab: true,
  });
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    console.log('on stop executed');
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    //window.chrome.tabs.create({ url: url });
    chrome.runtime.sendMessage({ recordingStopped: true, videoData: url });
  };

  mediaRecorder.start();
}
