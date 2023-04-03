import { createImageModule } from "./images.js"
import { createMessageModule } from "./messages.js"
import { createTaskBox } from "./tasks.js"
import { Articles } from "./articles.js"

export const createHTML = () => {
      // Render all your UI components here
      return `
     
      ${createImageModule()}
      ${createMessageModule()}
      ${createTaskBox()}
      ${Articles()}

      `
}