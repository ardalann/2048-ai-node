// @flow

const keypress = require("keypress");

keypress(process.stdin);

process.stdin.on(
  "keypress",
  (ch: ?string, key: { name: string, ctrl: boolean }) => {
    console.log('got "keypress"', ch, key);
    if (key && key.ctrl && key.name === "c") {
      process.stdin.pause();
    }
  }
);

process.stdin.setRawMode(true);
process.stdin.resume();
