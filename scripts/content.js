function triggerAnswer() {
  enabled = true;

  function waitForElement(selector, callback) {
      const interval = setInterval(() => {
          const element = document.querySelector(selector);
          if (element) {
              clearInterval(interval);
              callback(element);
          }
      }, 2);
  };
  
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "clickerDisabled") {
          enabled = false;
          console.log("Clicker disabled");
      }
  });

  waitForElement('.topBorder', (element) => {
    if (enabled) {
        document.querySelector('.mainAction').click();
        chrome.runtime.sendMessage({ action: 'answerClickPerformed' });
      };
  });
};

triggerAnswer();
