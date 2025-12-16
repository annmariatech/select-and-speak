chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "speak") {
    chrome.tts.stop();
    chrome.tts.speak(msg.text, {
      voiceName: msg.voice,
      rate: 1,
      pitch: 1,
      volume: 1
    });
  }

  if (msg.type === "stop") {
    chrome.tts.stop();
  }
});
