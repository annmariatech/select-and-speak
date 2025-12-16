const voiceSelect = document.getElementById("voices");

// load voices
chrome.tts.getVoices((voices) => {
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.voiceName;
    option.textContent = `${voice.voiceName} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
});

document.getElementById("speak").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: () => window.getSelection().toString()
    },
    (results) => {
      const text = results[0].result;
      const selectedVoice = voiceSelect.value;

      if (!text) return;

      chrome.runtime.sendMessage({
        type: "speak",
        text,
        voice: selectedVoice
      });
    }
  );
});

document.getElementById("stop").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "stop" });
});

