// Responsibility: Creates and adds new featured articles. Can also delete them or open in a new window. Sorted by most recently added.
import { getArticles, saveArticles, deleteArticles } from "./dataAccess.js"

// Holds the selected tag for filtering articles
let selectedTag = null

// Generate HTML for the list of articles, sorted by most recent date
const articleList = () => {
    const articles = getArticles()
    // Filter articles based on the selected tag (if any)
    const filteredArticles = selectedTag ? articles.filter(article => article.tags && article.tags.includes(selectedTag)) : articles

    // Generate HTML for each filtered article
    return filteredArticles.map(article => {
        // Check if article.tags is defined and contains at least one non-empty string
            const tagButtons = (article.tags && article.tags.length > 0 && article.tags[0] !== "") 
        // If the condition is true, create a string of HTML button elements using the tags in article.tags
            ? article.tags.map(tag => `<button class="tag" data-tag="${tag}">${tag}</button>`).join("")
        // If the condition is false, assign an empty string to tagButtons
            : ""

            return `
                <div class="article">
                    <h3>${article.title}${tagButtons ? ` ${tagButtons}` : ""}</h3>
                    <p class="articleDate">${article.date}</p>
                    <p>${article.synopsis}</p>
                    <button class="openArticle"><a href="${article.url}" target="_blank">Open</a></button>
                    <button class="deleteArticle" data-id="${article.id}">Delete Article</button>
                </div>
            `
        }).join("")
    }

// Toggle visibility of the article form
const toggleArticleForm = () => {
    const form = document.querySelector("#articleForm")
    form.classList.toggle("hidden")
}

// Save article and prevent the form submission from refreshing the page
const saveArticleHandler = (event) => {
    event.preventDefault()

    const title = document.querySelector("#articleTitle").value
    const url = document.querySelector("#articleUrl").value
    const synopsis = document.querySelector("#articleSynopsis").value
    const date = new Date().toISOString().split('T')[0]
    const tags = document.querySelector("#articleTags").value.split(',').map(tag => tag.trim())

    const newArticle = { title, url, synopsis, date, tags }
    saveArticles(newArticle)
}

// Add event listeners for deleting articles and filtering articles by tag
const attachEventListeners = () => {
    // Attach event listener to all delete buttons
    const deleteButtons = document.querySelectorAll(".deleteArticle")
    deleteButtons.forEach(button => button.addEventListener("click", event => {
        // Get the ID of the article to delete
        const articleId = parseInt(event.target.dataset.id)
        // Call the deleteArticles function with the article ID as an argument
        deleteArticles(articleId)
    }))

    // Attach event listener to all tag buttons
    const tagButtons = document.querySelectorAll(".tag")
    tagButtons.forEach(button => button.addEventListener("click", event => {
        // Get the tag from the clicked button
        const tag = event.target.dataset.tag
        // Call the filterArticlesByTag function with the tag as an argument
        filterArticlesByTag(tag)
    }))
}

export const initEventListeners = () => {
    document.addEventListener("click", event => {
        // If the "Show All" button is clicked, show all articles
        if (event.target.id === "showAllArticles") {
            showAllArticles()
        } 
        // If a delete button is clicked, delete the corresponding article
        else if (event.target.classList.contains("deleteArticle")) {
            const articleId = parseInt(event.target.dataset.id)
            deleteArticles(articleId)
        } 
        // If a tag button is clicked, filter articles by the corresponding tag
        else if (event.target.classList.contains("tag")) {
            const tag = event.target.dataset.tag
            filterArticlesByTag(tag)
        }
    })

    // Add event listener to the "Add new article" button to show/hide the article form
    const addNewArticleButton = document.querySelector("#addNewArticle")
    if (addNewArticleButton) {
        addNewArticleButton.removeEventListener("click", toggleArticleForm)
        addNewArticleButton.addEventListener("click", toggleArticleForm)
    }

    // Add event listener to the "Add Article" button to save the new article
    const saveArticleButton = document.querySelector("#saveArticle")
    if (saveArticleButton) {
        saveArticleButton.removeEventListener("click", saveArticleHandler)
        saveArticleButton.addEventListener("click", saveArticleHandler)
    }

    // Attach event listeners for deleting articles and filtering articles by tag
    attachEventListeners()
}

// Show all articles by resetting the selectedTag variable to null and re-rendering the article list
const showAllArticles = () => {
    selectedTag = null
    document.querySelector("#articles").innerHTML = Articles()
    initEventListeners()
}


// Generate the complete Articles component HTML
export const Articles = () => {
    return `
        <div id="articles">
            <h2>Articles</h2>
            ${articleList()}
            <button id="addNewArticle">+ Add new article</button>
            <button id="showAllArticles">Show All</button>
            <form id="articleForm" class="hidden">
                <label for="articleTitle">Title</label>
                <input type="text" id="articleTitle" required>
                <label for="articleUrl">URL</label>
                <input type="text" id="articleUrl" required>
                <label for="articleSynopsis">Synopsis</label>
                <input type="text" id="articleSynopsis" required>
                <label for="articleTags">Tags</label>
                <input type="text" id="articleTags" placeholder="tag1, tag2, tag3">
                <button id="saveArticle">Add Article</button>
            </form>
        </div>
    `
}


// This function filters articles by the provided tag, updates the articles container with the filtered articles, and re-attaches event listeners
const filterArticlesByTag = (tag) => {
    // Set the selectedTag variable to the provided tag
    selectedTag = tag
    // Update the HMTL of the #articles container with the filtered articles
    document.querySelector("#articles").innerHTML = Articles()
    // Re-attach event listeners after updating the inner HTML
    initEventListeners()
}

// Initialize event listeners when the script is first executed
initEventListeners()
