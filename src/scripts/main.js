
import { fetchArticles, fetchEvents, fetchMessages, fetchPhotos, fetchTasks, setChuckFact, fetchRandomJoke } from "./dataAccess.js"
import { createHTML } from "./createHTML.js"
import { fetchRandomFact } from "./apiAccess.js"
import { initEventListeners } from "./articles.js"

const dashboard = document.querySelector("#dashboard")

const render = () => {
    fetchArticles()
        .then(() => fetchEvents())
        .then(() => fetchTasks())
        .then(() => fetchPhotos())
        .then(() => fetchMessages())
        .then(() => fetchRandomJoke())
        .then(() => {
            dashboard.innerHTML = createHTML()
            // Initialize event listeners for the Articles component
            initEventListeners()
            // Fetch a random Chuck Norris fact
            return fetchRandomFact()
        })
        // Set the fact in the application state
        .then(fact => {
            setChuckFact(fact)
        })
}

render()

dashboard.addEventListener("stateChanged", customEvent => {
    render()
})

