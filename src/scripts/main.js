
import { fetchArticles, fetchEvents, fetchMessages, fetchPhotos, fetchTasks, setChuckFact, fetchRandomJoke, getTasks } from "./dataAccess.js"
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
        .then(() => {
            const tasks = getTasks()

            const taskComplete = tasks.filter(task => {
               return task.complete
            }).length

            const taskIncomplete = tasks.filter(task => {
                return !task.complete
            }).length

            dashboard.innerHTML += createHTML()
            const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Complete', 'Incomplete'],
      datasets: [{
        label: 'Tasks',
        data: [taskComplete, taskIncomplete],
        
      }]
    },
    options: {

    }
  });
        })
        
}

render()

dashboard.addEventListener("stateChanged", customEvent => {
    render()
})

