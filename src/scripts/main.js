
import { fetchArticles, fetchEvents, fetchMessages, fetchPhotos, fetchTasks, setChuckFact } from "./dataAccess.js"
import { createHTML } from "./createHTML.js"
import { fetchRandomFact } from "./apiAccess.js"

const dashboard = document.querySelector("#dashboard")

const render = () => {
    fetchArticles()
        .then(() => fetchEvents())
        .then(() => fetchTasks())
        .then(() => fetchPhotos())
        .then(() => fetchMessages())
        .then(() => {
            dashboard.innerHTML = createHTML()
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
