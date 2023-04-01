// Responsibility: Generate the HTML for chat and new message section
import { getMessages, saveMessage } from "./dataAccess.js"

export const createMessageModule = () => {
const messages = getMessages()

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
            <label class="label" for="name"><h3>User Name</h3></label>
            <input type="text" id="new-message-username" class="input"></input>
            <button class="button" id="new-message-save-button">Send</button>
        </div>`
}

// lets listen for the click of the send message button
document.querySelector("#dashboard").addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "new-message-save-button") {

        // grab userName and userMessage
        const userName = document.querySelector('input[id="new-message-username"]').value
        const userMessage = document.querySelector('textarea[name="new-message-input"]').value

        // make sure username and message not blank, and let user know if they are
        if(!userName || !userMessage){
            window.alert('Please enter a user name and message before hitting send')
            return
        }

        // create a message object out of the user inputs
        else{
            const newMessageObject = {
                userName: userName,
                message: userMessage
            }

            // send the message object to the API for permanent storage
            saveMessage(newMessageObject)
        }
    }
})