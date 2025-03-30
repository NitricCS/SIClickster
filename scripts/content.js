function triggerAnswer() {
  if (navigator.userAgent.includes("Chrome")) {
    bs = chrome;
  } else if (navigator.userAgent.includes("Mozilla")) {
    bs = browser;
  };
  const options = { childList: true, subtree: true };
  const gameTableElement = document.querySelector('.tableBorder');

  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        mutation.removedNodes.forEach((node) => {
          if (node === gameTableElement) {
            bs.runtime.sendMessage({ action: 'noQuestionFound' });
            observer.disconnect();
          };
        });
      };
      mutation.addedNodes.forEach((node) => {
        if (node === document.querySelector('.topBorder')) {
            setTimeout( function() {
              document.querySelector('.mainAction').click();
              bs.runtime.sendMessage({ action: 'answerClickPerformed' });
            }, 3);
          observer.disconnect();
        };
      });
    }
  };

  const observer = new MutationObserver(callback);

  if (gameTableElement) {
    const tableParent = gameTableElement.parentNode;
    observer.observe(tableParent, options);
    bs.runtime.onMessage.addListener((message, sender, sendResponse ) => {
      if (message.action === 'clickerDisabled') {
          observer.disconnect();
      }
  });
  } else {
    bs.runtime.sendMessage({ action: 'noQuestionFound' });
  };
};

triggerAnswer();
