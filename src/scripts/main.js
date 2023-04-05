
import { fetchArticles, fetchEvents, fetchMessages, fetchPhotos, fetchTasks, setChuckFact,  getChuckFact, fetchRandomJoke, getTasks } from "./dataAccess.js"
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
            // this will prevent the chuck code from cycling upon article deletion 8) 
            // check if the chuck norris fact is already set in the state
            if (!getChuckFact()) { // is chuck saved in the db?
                fetchRandomFact() // if not, fetch chuck
                    .then((fact) => {  // set chuck in the application state
                        setChuckFact(fact)
                    })
            }
        })
        .then(() => {
            dashboard.innerHTML = createHTML()
            // Initialize event listeners for the Articles component
            initEventListeners()
        })
        .then(() => {
            const tasks = getTasks()

            const taskComplete = tasks.filter(task => {
               return task.complete
            }).length

            const taskIncomplete = tasks.filter(task => {
                return !task.complete
            }).length

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
                options: {}
            });
        })
}





render()

dashboard.addEventListener("stateChanged", customEvent => {
    render()
})


