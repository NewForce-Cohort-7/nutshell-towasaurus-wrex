import { getChuckFact, setChuckFact } from "./dataAccess.js"
import { fetchRandomFact } from "./apiAccess.js"

// Handles the "Generate Fact" button click
const generateFactButtonHandler = () => {
    // Fetch a random Chuck Norris fact
    fetchRandomFact()
        .then(fact => {
            // Update the application state with the new fact 
            setChuckFact(fact)
        })
}

// Renders the Chuck Norris fact section
const render = () => {
    // Retrieves the current Chuck Norris fact from the application state
    const chuckFact = getChuckFact()

    // Generate the HTML
    const html = `
        <div id="chuckNorrisFact">
            <h2>Random Chuck Norris Fact</h2>
            <p>${chuckFact}</p>
            <button id="generateFact">Generate New Fact</button>
        </div>
    `

    // Update the innerHTML
    document.querySelector("#chuckNorrisFact").innerHTML = html
}

// Creates the initial HTML for the Chuck Norris fact section
export const createChuckHTML = () => {
    // Get the current Chuck Norris fact from the application state
    const chuckFact = getChuckFact()

    const html = `
        <div id="chuckNorrisFact">
            <h2>Chuck Norris Fact of the Day</h2>
            <p>${chuckFact}</p>
            <button id="generateFact">Generate New Fact</button>
        </div>
    `

    // Event listener for the "Generate Fact" button click event
    document.addEventListener("click", event => {
        if (event.target.id === "generateFact") {
            // Calls the generateFactButtonHandler function when the button is clicked
            generateFactButtonHandler()
        }
    })

    return html
}


document.addEventListener("stateChanged", event => {
    // Calls the render function when the application state is updated
    render()
})
