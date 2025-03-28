[![en](https://img.shields.io/badge/lang-ru-blue.svg)](https://github.com/NitricCS/SIClickster/blob/main/README.md)

## SICLickster
A browser extension that automatically clicks _Answer_ when playing SIGame.

### Usage
SIClickster is disabled by default. You can enable it in-game at any point by clicking on its icon in your browser's toolbar.\
The badge on the extension icon should switch from OFF to ON.\
The extension can only be activated from a tab with SIGame open.

When activated, the extension will automatically click the _Answer_ button in SIGame as soon as it becomes possible.\
Be careful in games without false starts: the extension will click _Answer_ as soon as the question is selected.\
Only activate the extension when you see the question and want to win the button.

You __can activate__ the extension __when the question is already being played__, _e.g._, when another player is answering. In this case, SIClickster will automatically click _Answer_ if that player answers wrong.

After clicking once, the extension will __automatically disable__. You need to activate it for every question you want to answer.

If you activated SIClickster but changed your mind, you can still switch it off before it clicks _Answer_ for you. Just click the icon again to do so.

### Installation
#### From Releases
1. Download the ZIP of the latest release from the Releases section here on Github.
2. Go to Chrome, open the Extensions page (click the Extensions menu puzzle button and select _Manage Extensions_).
3. Drag and drop the downloaded ZIP into the page. The extension will be installed.

#### From Source
Clone this repo and load an unpacked extension from Chrome:
1. Go to the Extensions page (click the Extensions menu puzzle button and select _Manage Extensions_).
2. Enable Developer Mode by clicking the toggle switch next to _Developer mode_.
3. Click the _Load unpacked button_ and select the directory where you cloned this repo.
