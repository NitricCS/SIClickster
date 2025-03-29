const sigame = 'https://sigame.vladimirkhil.com/';
const enabledColor = '#0F1AAB';
const disabledColor = '#C97412';

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: 'OFF',
    });
    chrome.action.setBadgeBackgroundColor(
        {color: disabledColor},
        () => { /* ... */ },
      );
  });

chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(sigame)) {
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        const nextState = prevState === 'ON' ? 'OFF' : 'ON';

        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        });

        if (nextState === 'ON') {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['scripts/content.js'],
            });

            chrome.action.setBadgeBackgroundColor(
                {color: enabledColor},
                () => { /* ... */ },
            );
        } else if (nextState === 'OFF') {
            chrome.action.setBadgeBackgroundColor(
                {color: disabledColor},
                () => { /* ... */ },
            );
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tab.id, { action: 'clickerDisabled' });
            });
        }

        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.action === 'answerClickPerformed' || message.action === 'noQuestionFound') {
                chrome.action.setBadgeText({
                    tabId: tab.id,
                    text: 'OFF',
                });
                chrome.action.setBadgeBackgroundColor(
                    {color: disabledColor},
                    () => { /* ... */ },
                  );
            }
        });
    }
});

