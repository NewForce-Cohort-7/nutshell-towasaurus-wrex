// main.js or any other file where you define createHTML()

import { listOfEvents } from "./Events.js"
import { createImageModule } from "./images.js"
import { createMessageModule } from "./messages.js"
import { createTaskBox } from "./tasks.js"
import { Articles } from "./articles.js"

export const createHTML = factHTML => {
  return `
    ${createImageModule()}
    ${createMessageModule()}
    ${listOfEvents()}
    ${createTaskBox()}
    ${Articles()}
    ${factHTML}
  `;
};
