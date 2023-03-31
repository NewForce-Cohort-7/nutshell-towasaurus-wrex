import { fetchArticles, fetchEvents, fetchMessages, fetchPhotos, fetchTasks, fetchUsers } from "./dataAccess.js"
import { createHTML } from "./createHTML.js"

const dashboard = document.querySelector("#dashboard")

const render = () => {
    fetchArticles()
    .then(() => fetchEvents())
    .then(() => fetchTasks())
    .then(() => fetchPhotos())
    .then(() => fetchMessages())
    .then(() => {
            dashboard.innerHTML = createHTML()
        }
    )
}

render()

dashboard.addEventListener("stateChanged", customEvent => {
    render()
})
