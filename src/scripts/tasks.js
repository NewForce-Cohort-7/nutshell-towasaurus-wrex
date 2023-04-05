import { getTasks, sendTask, markTaskComplete } from "./dataAccess.js";


const dashboard = document.querySelector("#dashboard")

dashboard.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "addTaskButton") {
        // Get what the user typed into the form fields
        const newTaskText = document.querySelector("input[id='newTaskText']").value
        const newTaskDate = document.querySelector("input[id='newTaskDate']").value

        const toAPI = {
            description: newTaskText,
            date: newTaskDate,
            complete: false
        }

            sendTask(toAPI)
        }
    }
)

const inputsAppear = () => {
   return`
    <label class="label" for="newTaskText">Task Description</label>
<input type="text" id="newTaskText" class="input"/>

<label class="label" for="newTaskDate">Expected Date</label>
<input type="date" id="newTaskDate" class="input"/>

<button class="button" id="addTaskButton">Add A New Task</button>`

}

dashboard.addEventListener("click", event => {
    if (event.target.id ==="createTaskButton") {
        document.querySelector("#textBoxHere").innerHTML = inputsAppear()
    }
})


export const createTaskBox = () => {
const tasks = getTasks()
let completedCount = 0
let total = 0
total = tasks.length

completedCount = tasks.filter(task => {
    return task.complete
}).length

const percentage = (total > 0) ? (completedCount/total) * 100 : 0

return`
<div>
<canvas id="myChart"></canvas>
</div>
<h3 id="percentComplete">Tasks Completed: ${percentage}%</h3>
<h3>Incomplete Tasks</h3>

${tasks.map(task => {
    if(!task.complete){ 
        return `
            <div class="taskContainer" id="${task.id}">
            <div class="task-text-container"><p class="task-text">${task.description}</p></div> 
            <div class="task-date-container"><p class="task-date">${task.date}</p></div>
            <input type="checkbox" class="checkbox" id="completeTask--${task.id}"></input>
            </div>
            `
        }
    }).join("")
}

<h3>Complete Tasks</h3>

${tasks.map(task => {
    if(task.complete){ 
        return `
            <div class="taskContainer" id="${task.id}">
            <div class="task-text-container"><p class="task-text">${task.description}</p></div> 
            <div class="task-date-container"><p class="task-date">${task.date}</p></div>
            </div>
            `
        }
    }).join("")
}


<div id="textBoxHere"></div>
<div id="taskBox">
<button class="button" id="createTaskButton">Create A New Task</button>
</div>
`
}
  
dashboard.addEventListener("click", click => {
    if (click.target.id.startsWith("completeTask--")) {
        const [,taskId] = click.target.id.split("--")
        markTaskComplete(parseInt(taskId))
    }
})



