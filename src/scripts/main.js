import { Nutshell } from "./Nutshell.js"


const dashboard = document.querySelector("#dashboard")

const render = () => {
    fetchRequests()
    .then(() => {
            dashboard.innerHTML = Nutshell()
            
        }
    )
}

render()

