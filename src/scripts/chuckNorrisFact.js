// chuckNorrisFact.js
import { getChuckFact, setChuckFact } from "./dataAccess.js"
import { fetchRandomFact } from "./apiAccess.js"

const generateFactButtonHandler = () => {
    fetchRandomFact()
        .then(fact => {
            setChuckFact(fact)
        })
}

const render = () => {
    const chuckFact = getChuckFact()
    const html = `
        <div id="chuckNorrisFact">
            <h2>Chuck Norris Fact</h2>
            <p>${chuckFact}</p>
            <button id="generateFact">Generate Fact</button>
        </div>
    `

    document.querySelector("#chuckNorrisFact").innerHTML = html
}

export const createChuckHTML = () => {
    const chuckFact = getChuckFact()
    const html = `
        <div id="chuckNorrisFact">
            <h2>Chuck Norris Fact</h2>
            <p>${chuckFact}</p>
            <button id="generateFact">Generate Fact</button>
        </div>
    `

    // Add the event listener inside the createChuckHTML function
    document.addEventListener("click", event => {
        if (event.target.id === "generateFact") {
            generateFactButtonHandler()
        }
    })

    return html
}

document.addEventListener("stateChanged", event => {
    render()
})
