// Responsibility: Generate the HTML for images and image submission section

import { deleteImage, getPhotos, saveImage } from "./dataAccess.js"

export const createImageModule = () => {
const images = getPhotos()
return `<section id="images-module">
            <h3 id="images-header">Images</h3>
            <div id="images-grid">
                ${images.map(image => {
                    return `<div class="image-container">
                                <img class="image" id="${image.id}" src="${image.url}"/>
                                <button class="delete-button" id="delete-image--${image.id}" value="${image.id}">Delete</button>
                                <div class="image-text-container">${image.caption}</div> 
                            </div>`}).join("")
                }
            </div>
            <button class="button" id="new-image-button">+ Add New Image</button>
            <div id="new-image-form"></div>
        </section>`
}

// listen for the click of the image delete button and delete the image when clicked
document.addEventListener("click", event => {
    if (event.target.id.startsWith("delete-image--")) {
        deleteImage(parseInt(event.target.value))
    }
})

// listen for the click of the add new image button and display the new image form when clicked
document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "new-image-button") {
        document.querySelector('#new-image-form').innerHTML = createNewImageForm()
    }
})

// function that creates HTML for a new image form
const createNewImageForm = () => {
    return `<h3>New image</h3>
            <label class="label" for="new-image-url">URL</label>
            <input type="text" id="new-image-url" class="input"></input>
            <label class="label" for="new-image-caption">Caption</label>
            <input type="text" maxlength="30" id="new-image-caption" class="input"></input>
            <button class="button" id="save-image-button">Save</button>`
}

// listen for the click of the save image button, and save new image when clicked
document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "save-image-button") {

        // grab the user inputs for URL and CAPTION
        const userURL = document.querySelector('input[id="new-image-url"]').value
        const userCaption = document.querySelector('input[id="new-image-caption"]').value

         // make sure userName and message not blank, and let user know if they are
         if(!userURL || !userCaption){
            window.alert('Please enter a url and caption in order to save a new image')
            return
        }
        // create an image object out of the user inputs
        const newImageObject = {
            url: userURL,
            caption: userCaption,
            date: Date.now()
        }
    
        // send the image object to the API for permanent storage
        saveImage(newImageObject)
    }
})