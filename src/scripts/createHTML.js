import { createImageModule } from "./images.js"
import { createMessageModule } from "./messages.js"

export const createHTML = () => {
      // Render all your UI components here
      return `
      
      ${createImageModule()}
      ${createMessageModule()}
      
      `
}