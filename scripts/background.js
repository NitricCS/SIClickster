const sigame = 'https://sigame.vladimirkhil.com/';
const enabledColor = '#0F1AAB';
const disabledColor = '#C97412';

if (navigator.userAgent.includes("Chrome")) {
    bs = chrome;
  } else if (navigator.userAgent.includes("Mozilla")) {
    bs = browser;
  };

bs.runtime.onInstalled.addListener(() => {
    bs.action.setBadgeText({
      text: 'OFF',
    });
    bs.action.setBadgeBackgroundColor(
        {color: disabledColor},
        () => { /* ... */ },
      );
  });

bs.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(sigame)) {
        const prevState = await bs.action.getBadgeText({ tabId: tab.id });
        const nextState = prevState === 'ON' ? 'OFF' : 'ON';

        await bs.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        });

        if (nextState === 'ON') {
            bs.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['scripts/content.js'],
            });

            bs.action.setBadgeBackgroundColor(
                {color: enabledColor},
                () => { /* ... */ },
            );
        } else if (nextState === 'OFF') {
            bs.action.setBadgeBackgroundColor(
                {color: disabledColor},
                () => { /* ... */ },
            );
            bs.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                bs.tabs.sendMessage(tab.id, { action: 'clickerDisabled' });
            });
        }

        bs.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.action === 'answerClickPerformed' || message.action === 'noQuestionFound') {
                bs.action.setBadgeText({
                    tabId: tab.id,
                    text: 'OFF',
                });
                bs.action.setBadgeBackgroundColor(
                    {color: disabledColor},
                    () => { /* ... */ },
                  );
            }
        });
    }
});

