// Responsibility: Generate the HTML for images and image submission section

import { deleteImage, getPhotos, saveImage } from "./dataAccess.js"

// Holds the selected tag for filtering images
let selectedTag = null

export const createImageModule = () => {

return `<section id="images-module">
            <h3 id="images-header">Images</h3>
            <div id="images-grid">
            ${createImageGrid()}
            </div>
            <button class="button" id="new-image-button">+ Add New Image</button>
            <div id="new-image-form"></div>
        </section>`
}

const createImageGrid = () => {

    const images = getPhotos()

    // Filter images based on the selected tag (if any)
    const filteredImages = selectedTag ? images.filter(image => image.tags && image.tags.includes(selectedTag)) : images
    
    return `
    
    ${filteredImages.map(image => {

        // Generate tag buttons for each tag in the article
        const tagButtons = (image.tags && image.tags.length > 0) 
        ? image.tags.map(tag => `<button class="image-tag" data-tag="${tag}">${tag}</button>`).join("")
        : ""


            return `
                    <div class="image-container">
                        <img class="image" id="${image.id}" src="${image.url}"/>
                        <div class="image-text-container">${image.caption}</br>${tagButtons}</div> 
                        <button class="delete-button" id="delete-image--${image.id}" value="${image.id}">Delete</button>
                    </div>
                    
                    
                    `}).join("")
        }
        
    `
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

// listen for the click of a tag button and display only the images with the same tag
document.addEventListener("click", event => {
    if (event.target.classList.contains("tag")) {
        selectedTag = event.target.dataset.tag;
    }
    // Update the HMTL of the images-grid container with the filtered articles
    document.querySelector("#images-grid").innerHTML = createImageGrid();
})

// function that creates HTML for a new image form
const createNewImageForm = () => {
    return `<h3>New image</h3>

            <label class="label" for="new-image-url">URL</label>
            <input type="text" id="new-image-url" class="input"></input>
            </br>
            <label class="label" for="new-image-caption">Caption</label>
            <input type="text" maxlength="30" id="new-image-caption" class="input"></input>
            </br>
            <label for="new-image-tags">Tags</label>
            <input type="text" id="new-image-tags" placeholder="tag1, tag2, tag3">
            </br>
            <button class="button" id="save-image-button">Save</button>`
}

// listen for the click of the save image button, and save new image when clicked
document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "save-image-button") {

        // grab the user inputs for URL and CAPTION
        const userURL = document.querySelector('input[id="new-image-url"]').value
        const userCaption = document.querySelector('input[id="new-image-caption"]').value
        const tags = document.querySelector("#new-image-tags").value.split(',').map(tag => tag.trim())

        console.log(tags)

         // make sure userName and message not blank, and let user know if they are
         if(!userURL || !userCaption){
            window.alert('Please fill out all fields in order to save a new image')
            return
        }
        // create an image object out of the user inputs
        const newImageObject = {
            url: userURL,
            caption: userCaption,
            date: Date.now(),
            tags: tags
        }
    
        // send the image object to the API for permanent storage
        saveImage(newImageObject)
    }
})