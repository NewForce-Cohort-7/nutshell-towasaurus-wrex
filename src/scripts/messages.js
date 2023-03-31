// Responsibility: Generate the HTML for all completed potions and elixirs
import { getMessages, getUsers, saveMessage } from "./dataAccess.js"

export const createMessageList = () => {
const messages = getMessages()
const users = getUsers()

return `<h3>Chat</h3>
        <div id="message-list">
            ${messages.map(message => {
                return `<div class="message-container" id="${message.id}">
                            <div class="message-name">${message.userName}:</div>
                            <div class="message-text-container"><p class="message-text">${message.message}</p></div> 
                        </div>`}).join("")
            }
        </div>
        <div id="new-message-container">

            <label class="label" for="purpose"><h3>New Message</h3></label>
            <textarea id="new-message-input" name="new-message-input" rows="10" cols="50"></textarea>
            </br>
            <label class="label" for="name">User Name</label>
            <input type="text" id="new-message-username" class="input">

            <button class="button" id="new-message-button">Send</button>
        
        `
}

// lets listen for the click of the send message button
document.querySelector("#dashboard").addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "new-message-button") {

        // Create a message object out of the user inputs
        const newMessageData = {
            userName: document.querySelector('input[id="new-message-username"]').value,
            message: document.querySelector('textarea[name="new-message-input"]').value
        }

        // Send the message object to the API for permanent storage
        saveMessage(newMessageData)
    }
})