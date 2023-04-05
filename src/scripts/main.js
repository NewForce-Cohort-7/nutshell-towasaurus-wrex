import { fetchArticles, fetchEvents, fetchMessages, fetchPhotos, fetchTasks, getChuckFact, setChuckFact, getTasks } from "./dataAccess.js"
import { createHTML } from "./createHTML.js"
import { fetchRandomFact } from "./apiAccess.js"

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
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
        })
        
}

render()

dashboard.addEventListener("stateChanged", customEvent => {
    render()
})

