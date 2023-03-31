import { createMessageList } from "./messages.js"

export const createHTML = () => {
      // Render all your UI components here
      return `${createMessageList()}`
}