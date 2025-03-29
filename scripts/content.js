function triggerAnswer() {
  const options = { childList: true, subtree: true };
  const gameTableElement = document.querySelector('.tableBorder');

  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        mutation.removedNodes.forEach((node) => {
          if (node === gameTableElement) {
            chrome.runtime.sendMessage({ action: 'noQuestionFound' });
            observer.disconnect();
          };
        });
      };
      mutation.addedNodes.forEach((node) => {
        if (node === document.querySelector('.topBorder')) {
            setTimeout( function() {
              document.querySelector('.mainAction').click();
              chrome.runtime.sendMessage({ action: 'answerClickPerformed' });
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
    chrome.runtime.onMessage.addListener((message, sender, sendResponse ) => {
      if (message.action === 'clickerDisabled') {
          observer.disconnect();
      }
  });
  } else {
    chrome.runtime.sendMessage({ action: 'noQuestionFound' });
  };
};

triggerAnswer();
