`use strict`;

console.log(`js loaded ok`);

const clockEl = document.querySelector(`.time`);

const amPmEl = document.querySelector(`.am-pm`);

const dateEl = document.querySelector(`.date`);

const nameEl = document.querySelector(`.name`);

const definitionEl = document.querySelector(`.description`);

const contentsEl = document.querySelector(`.contents`);

const contentsObj = {
  Ajax: `./DEFINITIONS/ajax_definitions.json`,
  Algorithms: `./DEFINITIONS/algorithms_definitions.json`,
  Bash: `./DEFINITIONS/bash_definitions.json`,
  Computer_Science: `./DEFINITIONS/computer_science_definitions.json`,
  Data_Structures: `./DEFINITIONS/data_structures_definitions.json`,
  Git: `./DEFINITIONS/git_definitions.json`,
  Git_Hub: `./DEFINITIONS/git_hub_definitions.json`,
  jQuery: `./DEFINITIONS/jquery_definitions.json`,
  JavaScript: `./DEFINITIONS/js_definitions.json`,
  Networking: `./DEFINITIONS/networking_definitions.json`,
  NodeJs: `./DEFINITIONS/nodejs_definitions.json`,
  PowerShell: `./DEFINITIONS/powershell_definitions.json`,
  Python: `./DEFINITIONS/python_definitions.json`,
  React: `./DEFINITIONS/react_definitions.json`,
  Redux: `./DEFINITIONS/redux_definitions.json`,
};

const capitalise = function (word) {
  let firstLettter = word[0].toUpperCase();
  let restWord = word.slice(1).toLowerCase();
  return firstLettter.concat(restWord);
};

const clock = function () {
  const now = new Date();

  const hour = now.getHours();

  const hours = (now.getHours() % 12 || 12).toString().padStart(2, 0);

  const minutes = now.getMinutes().toString().padStart(2, 0);

  const seconds = now.getSeconds().toString().padStart(2, 0);

  const amPm = now.getHours() < 12 ? `AM` : `PM`;

  const timeOfDayArr = [`morning`, `day`, `afternoon`, `evening`, `night`];

  let timeOfDay;

  if (hour >= 0 && hour <= 12) {
    timeOfDay = timeOfDayArr[0];
  }

  if (hour >= 13 && hour <= 14) {
    timeOfDay = timeOfDayArr[1];
  }

  if (hour >= 15 && hour <= 18) {
    timeOfDay = timeOfDayArr[2];
  }

  if (hour >= 19 && hour <= 22) {
    timeOfDay = timeOfDayArr[3];
  }

  if (hour >= 23) {
    timeOfDay = timeOfDayArr[4];
  }

  const days = [
    `sunday`,
    `monday`,
    `tuesday`,
    `wednesday`,
    `thursday`,
    `friday`,
    `saturday`,
  ];

  const months = [
    `january`,
    `february`,
    `march`,
    `april`,
    `may`,
    `june`,
    `july`,
    `august`,
    `september`,
    `octomber`,
    `november`,
    `december`,
  ];

  const sufixArr = [`st`, `nd`, `rd`, `th`];

  const day = days[now.getDay()];

  const date = now.getDate();

  const month = months[now.getMonth()];

  const year = now.getFullYear();

  const sufix = sufixArr[Number(date.toString().slice(-1)) - 1] || sufixArr[3];

  clockEl.textContent = `${hours}:${minutes}:${seconds}`;

  amPmEl.textContent = `${amPm}`;

  dateEl.textContent = `Good ${timeOfDay}! ${capitalise(
    day
  )} the ${date}'${sufix} of ${capitalise(month)} ${year}`;
};

setInterval(() => {
  clock();
}, 1000);

for (let i in Object.keys(contentsObj)) {
  contentsEl.insertAdjacentHTML(
    `beforeend`,
    `<button class= "btn-${Object.keys(contentsObj)[i]}">${
      Object.keys(contentsObj)[i]
    }</button>`
  );
  document
    .querySelector(`.btn-${Object.keys(contentsObj)[i]}`)
    .addEventListener(`click`, (event) => {
      event.preventDefault();

      fetch(Object.values(contentsObj)[i])
        .then((response) => response.json())
        .then((data) => {
          let randomEntry = Math.floor(
            Math.random() * Object.keys(data).length
          );

          let randomActiveWord = Object.values(data)[randomEntry].name;

          let randomDescription = Object.values(data)[randomEntry].description;

          nameEl.textContent = randomActiveWord;

          definitionEl.textContent = randomDescription;

          function playText(text) {
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
          }

          function compySays(a) {
            console.log(a);
            playText(a);
          }
          compySays(randomActiveWord);
          compySays(randomDescription);
        })
        .catch((error) => {
          console.log(error);
        });
    });
}
