
import { fetchArticles, fetchEvents, fetchMessages, fetchPhotos, fetchTasks, setChuckFact } from "./dataAccess.js"
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
        .then(() => fetchRandomFact())
        .then(fact => {
            setChuckFact(fact)
        })
        .then(() => {
            dashboard.innerHTML = createHTML()
        })
}

render()



dashboard.addEventListener("stateChanged", customEvent => {
    render()
})
