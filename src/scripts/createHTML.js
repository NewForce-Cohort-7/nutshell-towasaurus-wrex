import { createImageModule } from "./images.js"
import { createMessageModule } from "./messages.js"
import { createTaskBox } from "./tasks.js"

export const createHTML = () => {
      // Render all your UI components here
      return `
      ${createTaskBox()}
      ${createImageModule()}
      ${createMessageModule()}
      
      `
}