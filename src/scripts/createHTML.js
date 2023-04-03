import { createMessageList } from "./messages.js"
import { createTaskBox } from "./tasks.js"

export const createHTML = () => {
      // Render all your UI components here
      return `${createMessageList()}
      ${createTaskBox()}`
}