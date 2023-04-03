// Responsibility: Creates and adds new featured articles. Can also delete them or open in a new window. Sorted by most recently added.
import { getArticles, saveArticles, deleteArticles } from "./dataAccess.js"

// Generate HTML for the list of articles, sorted by most recent date
const articleList = () => {
    const articles = getArticles();
    return articles.map(article => `
        <div class="article">
            <h3>${article.title}</h3>
            <p class="articleDate">${article.date}</p>
            <p>${article.synopsis}</p>
            <button class="openArticle"><a href="${article.url}" target="_blank">Open</a></button>
            <button class="deleteArticle" data-id="${article.id}">Delete Article</button>
        </div>
    `).join("")
}

// Toggle visibility of the article form
const toggleArticleForm = () => {
    const form = document.querySelector("#articleForm");
    form.classList.toggle("hidden");
}

// Save article and prevent the form submission from refreshing the page
const saveArticleHandler = (event) => {
    event.preventDefault();

    const title = document.querySelector("#articleTitle").value;
    const url = document.querySelector("#articleUrl").value;
    const synopsis = document.querySelector("#articleSynopsis").value;
    const date = new Date().toISOString().split('T')[0];

    const newArticle = { title, url, synopsis, date };
    saveArticles(newArticle);
}

// Handle click events for adding, saving, and deleting articles
document.addEventListener("click", event => {
    if (event.target.id === "addNewArticle") {
        toggleArticleForm();
    } else if (event.target.id === "saveArticle") {
        saveArticleHandler(event);
    } else if (event.target.classList.contains("deleteArticle")) {
        const articleId = parseInt(event.target.dataset.id);
        deleteArticles(articleId);
    }
})

// Generate the complete Articles component HTML
export const Articles = () => {
    return `
        <div id="articles">
        <h2>Articles</h2>
            ${articleList()}
            <button id="addNewArticle">+ Add new article</button>
            <form id="articleForm" class="hidden">
                <label for="articleTitle">Title</label>
                <input type="text" id="articleTitle" required>
                <label for="articleUrl">URL</label>
                <input type="text" id="articleUrl" required>
                <label for="articleSynopsis">Synopsis</label>
                <input type="text" id="articleSynopsis" required>
                <button id="saveArticle">Add Article</button>
            </form>
        </div>
    `
}
