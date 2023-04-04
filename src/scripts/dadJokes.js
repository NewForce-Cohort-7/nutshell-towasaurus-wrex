import { fetchRandomJoke, getDadJoke, setDadJoke } from "./dataAccess.js"

// Create HTML for Dad Joke Section 
export const createDadJokes = () => {
    const dadJoke = getDadJoke()
    return `<div id="dad-joke">
                <h2>Random Dad Joke</h2>
                <p>${dadJoke.body[0].setup}</br>${dadJoke.body[0].punchline}</p>
                <button id="new-joke">Give me another joke</button>
            </div>`
}

// Event listener for the "Generate Fact" button click event
document.addEventListener("click", event => {
    if (event.target.id === "new-joke") {
        fetchRandomJoke()
        .then(joke => {
            // Update the application state with the new joke 
            setDadJoke(joke)
            //regen html
            dashboard.dispatchEvent(new CustomEvent("stateChanged"))
            
        })
    }
})
