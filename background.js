chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "FOUND") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "https://www.gstatic.com/chrome/extensions/icon128.png",
      title: "Keyword Found",
      message: `Detected: ${msg.word}`
    });
  }
});
