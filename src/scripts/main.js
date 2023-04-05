import { fetchArticles, fetchBreweriesByState, fetchEvents, fetchMessages, fetchPhotos, fetchTasks, getChuckFact, setChuckFact, fetchRandomJoke } from "./dataAccess.js"
import { createHTML } from "./createHTML.js"
import { fetchRandomFact} from "./apiAccess.js"

const dashboard = document.querySelector("#dashboard")

const render = () => {
    fetchArticles()
        .then(() => fetchEvents())
        .then(() => fetchTasks())
        .then(() => fetchPhotos())
        .then(() => fetchMessages())
        .then(() => fetchRandomFact())
        .then(() => fetchRandomJoke())
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
