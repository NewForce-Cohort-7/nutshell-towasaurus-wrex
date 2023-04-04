import { fetchArticles, fetchEvents, fetchMessages, fetchPhotos, fetchTasks } from "./dataAccess.js"
import { fetchRandomFact } from "./apiAccess.js"
import { createHTML } from "./createHTML.js"

const dashboard = document.querySelector("#dashboard")

const render = () => {
    fetchArticles()
    .then(() => fetchEvents())
    .then(() => fetchTasks())
    .then(() => fetchPhotos())
    .then(() => fetchMessages())
    .then(() => fetchRandomFact())
    .then(() => {
        dashboard.innerHTML = createHTML()
    })
}

render()

dashboard.addEventListener("stateChanged", customEvent => {
    render()
})
