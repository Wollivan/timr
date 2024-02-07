#!/usr/bin/env node

// play countdown music for last 30 seconds
import sound from "sound-play";
import path from "path";
import fs from "fs";
import { exec } from "child_process";

// Get the directory path of the current script
const moduleDir = new URL(".", import.meta.url).pathname;

// Define the path to the mp3 file relative to the module directory
const mp3FilePath = path.join(moduleDir, "countdown.mp3");

// default of 10 minutes
let time = 600;

// get the time if the user provides it (in minutes)
if (process.argv[2]) {
  time = process.argv[2] * 60;
}

// create the parts of each ascii number
const zero1 = ` .d8888b.  `;
const zero2 = `d88P  Y88b `;
const zero3 = `888    888 `;
const zero4 = `888    888 `;
const zero5 = `888    888 `;
const zero6 = `888    888 `;
const zero7 = `Y88b  d88P `;
const zero8 = ` "Y8888P"  `;

const one1 = ` d888   `;
const one2 = `d8888   `;
const one3 = `  888   `;
const one4 = `  888   `;
const one5 = `  888   `;
const one6 = `  888   `;
const one7 = `  888   `;
const one8 = `8888888 `;

const two1 = ` .d8888b.  `;
const two2 = `d88P  Y88b `;
const two3 = `       888 `;
const two4 = `     .d88P `;
const two5 = ` .od888P"  `;
const two6 = `d88P"      `;
const two7 = `888"       `;
const two8 = `888888888  `;

const three1 = ` .d8888b.  `;
const three2 = `d88P  Y88b `;
const three3 = `     .d88P `;
const three4 = `    8888"  `;
const three5 = `     "Y8b. `;
const three6 = `888    888 `;
const three7 = `Y88b  d88P `;
const three8 = ` "Y8888P"  `;

const four1 = `    d8888  `;
const four2 = `   d8P888  `;
const four3 = `  d8P 888  `;
const four4 = ` d8P  888  `;
const four5 = `d88   888  `;
const four6 = `8888888888 `;
const four7 = `      888  `;
const four8 = `      888  `;

const five1 = `888888888  `;
const five2 = `888        `;
const five3 = `888        `;
const five4 = `8888888b.  `;
const five5 = `     "Y88b `;
const five6 = `       888 `;
const five7 = `Y88b  d88P `;
const five8 = ` "Y8888P"  `;

const six1 = ` .d8888b.  `;
const six2 = ` d88P  Y88b `;
const six3 = ` 888        `;
const six4 = ` 888d888b.  `;
const six5 = ` 888P "Y88b `;
const six6 = ` 888    888 `;
const six7 = ` Y88b  d88P `;
const six8 = `  "Y8888P"  `;

const seven1 = `8888888888 `;
const seven2 = `      d88P `;
const seven3 = `     d88P  `;
const seven4 = `    d88P   `;
const seven5 = ` 88888888  `;
const seven6 = `  d88P     `;
const seven7 = ` d88P      `;
const seven8 = `d88P       `;

const eight1 = ` .d8888b.  `;
const eight2 = `d88P  Y88b `;
const eight3 = `Y88b. d88P `;
const eight4 = ` "Y88888"  `;
const eight5 = `.d8P""Y8b. `;
const eight6 = `888    888 `;
const eight7 = `Y88b  d88P `;
const eight8 = ` "Y8888P"  `;

const nine1 = ` .d8888b.  `;
const nine2 = `d88P  Y88b `;
const nine3 = `888    888 `;
const nine4 = `Y88b. d888 `;
const nine5 = ` "Y888P888 `;
const nine6 = `       888 `;
const nine7 = `Y88b  d88P `;
const nine8 = ` "Y8888P"  `;

const cowsay1 = `  ______________________ `;
const cowsay2 = `< Times up! Let's learn! >`;
const cowsay3 = `  ---------------------- `;
const cowsay4 = `        \\\   ^__^`;
const cowsay5 = `         \\\  (oo)\_______`;
const cowsay6 = `            (__)\       )\\\/\\\``;
const cowsay7 = `                ||----w |`;
const cowsay8 = `                ||     ||`;

function getTimeAscii(time) {
  // get the individual parts of our time (both the number, and the index to the below array)
  const digit1 = time[0];
  const digit2 = time[1];
  const digit3 = time[3];
  const digit4 = time[4];

  // a convinient array where the number is also the index - ooh
  const digitAscii = [
    [zero1, zero2, zero3, zero4, zero5, zero6, zero7, zero8],
    [one1, one2, one3, one4, one5, one6, one7, one8],
    [two1, two2, two3, two4, two5, two6, two7, two8],
    [three1, three2, three3, three4, three5, three6, three7, three8],
    [four1, four2, four3, four4, four5, four6, four7, four8],
    [five1, five2, five3, five4, five5, five6, five7, five8],
    [six1, six2, six3, six4, six5, six6, six7, six8],
    [seven1, seven2, seven3, seven4, seven5, seven6, seven7, seven8],
    [eight1, eight2, eight3, eight4, eight5, eight6, eight7, eight8],
    [nine1, nine2, nine3, nine4, nine5, nine6, nine7, nine8],
  ];

  // super complex, hyper 10x dev mode:
  const line1 = `${digitAscii[digit1][0]} ${digitAscii[digit2][0]}           ${digitAscii[digit3][0]} ${digitAscii[digit4][0]}`;
  const line2 = `${digitAscii[digit1][1]} ${digitAscii[digit2][1]}           ${digitAscii[digit3][1]} ${digitAscii[digit4][1]}`;
  const line3 = `${digitAscii[digit1][2]} ${digitAscii[digit2][2]}    888    ${digitAscii[digit3][2]} ${digitAscii[digit4][2]}`;
  const line4 = `${digitAscii[digit1][3]} ${digitAscii[digit2][3]}    888    ${digitAscii[digit3][3]} ${digitAscii[digit4][3]}`;
  const line5 = `${digitAscii[digit1][4]} ${digitAscii[digit2][4]}           ${digitAscii[digit3][4]} ${digitAscii[digit4][4]}`;
  const line6 = `${digitAscii[digit1][5]} ${digitAscii[digit2][5]}    888    ${digitAscii[digit3][5]} ${digitAscii[digit4][5]}`;
  const line7 = `${digitAscii[digit1][6]} ${digitAscii[digit2][6]}    888    ${digitAscii[digit3][6]} ${digitAscii[digit4][6]}`;
  const line8 = `${digitAscii[digit1][7]} ${digitAscii[digit2][7]}           ${digitAscii[digit3][7]} ${digitAscii[digit4][7]}`;

  // such wow.
  console.log(line1);
  console.log(line2);
  console.log(line3);
  console.log(line4);
  console.log(line5);
  console.log(line6);
  console.log(line7);
  console.log(line8);
}

// IT'S THE FINAL PART OF THE CODE! DIDODEEDOOO! DIDDEEDEEDOO!
const timeInterval = setInterval(() => {
  const minutesLeft = Math.floor(time / 60);
  const secondsLeft = time % 60;
  const formattedTime = `${
    minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft
  }:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
  console.clear();
  if (time === 0) {
    console.log(cowsay1);
    console.log(cowsay2);
    console.log(cowsay3);
    console.log(cowsay4);
    console.log(cowsay5);
    console.log(cowsay6);
    console.log(cowsay7);
    console.log(cowsay8);
    clearInterval(timeInterval);
  } else {
    getTimeAscii(formattedTime);
  }
  time--;
  if (secondsLeft === 30 && minutesLeft === 0) {
    sound.play(mp3FilePath, function (err) {
      console.log("woops sound didn't work");
    });
  }
}, 1000);
