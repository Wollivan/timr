#!/usr/bin/env node

let time = 600;

setInterval(() => {
  const minutesLeft = Math.floor(time / 60);
  const secondsLeft = time % 60 < 10 ? `0${time % 60}` : time % 60;
  console.clear();
  console.log(`${minutesLeft}:${secondsLeft}`);
  time--;
}, 1000);