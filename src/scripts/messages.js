// Responsibility: Generate the HTML for chat and new message section
import { deleteMessage, getMessages, saveMessage, thumbsDownMessage, thumbsUpMessage } from "./dataAccess.js"

export const createMessageModule = () => {
const messages = getMessages()

return `<h3>Chat</h3>
        <div id="message-list">
            ${messages.map(message => {
                return `<div class="message-container">
                            <div class="message-name">${message.userName}:</div>
                            <div class="message-text-container"><p class="message-text">${message.message}</p></div> 
                            <div class="message-interactions">
                                <img src="./images/thumbsUp.png" class="thumb" id="thumbsUp-${message.id}">
                                <div class="thumb-count">${message.thumbsUp}</div>
                                <img src="./images/thumbsDown.png" class="thumb" id="thumbsDown-${message.id}">
                                <div class="thumb-count">${message.thumbsDown}</div>
                                <button class="delete-button" id="delete-message--${message.id}" value="${message.id}">Delete</button>
                            </div>
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

// listen for the click of the  THUMBS UP button and call the function that increases that count when clicked
document.addEventListener("click", event => {
    if (event.target.id.startsWith("thumbsUp-")) {
        const [,messageID] = event.target.id.split("-")
        thumbsUpMessage(parseInt(messageID))
    }
})

// listen for the click of the THUMBS DOWN button and call the function that increases that count when clicked
document.addEventListener("click", event => {
    if (event.target.id.startsWith("thumbsDown-")) {
        const [,messageID] = event.target.id.split("-")
        thumbsDownMessage(parseInt(messageID))
    }
})


// listen for the click of the message delete button and delete the image when clicked
document.addEventListener("click", event => {
    if (event.target.id.startsWith("delete-message--")) {
        deleteMessage(parseInt(event.target.value))
    }
})


// listen for the click of the send message button and save it when clicked
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
                message: userMessage,
                thumbsUp: 0,
                thumbsDown: 0
            }

            // send the message object to the API for permanent storage
            saveMessage(newMessageObject)
        }
    }
})

