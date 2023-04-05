import { getBreweries, setBreweries, fetchBreweriesByState, fetchBreweriesByCity } from "./dataAccess.js";
const dashboard = document.querySelector("#dashboard")
export const BreweriesForm = () => {
    
    let html = `<div id="breweries-search">
    <h3>Search For Your Local Breweries!</h3>
    <label class="label" for="breweries-city">City</label>
    <input type="text" id="search-breweries-city" class="input"/>
    
    <label class="label" for="breweries-state">State</label>
    <input type="text" id="search-breweries-state" class="input"/>
    
    <button class="button" id="search-by-city">Search by City</button>
    <button class="button" id="search-by-state">Search by State</button>
    </div>
    `
    return html
}

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "search-by-city") {
        let cityName = document.querySelector("input[id='search-breweries-city']").value
        let adjustedCityName = cityName.replace(/ /g,"_");
        fetchBreweriesByCity(adjustedCityName)
        dashboard.dispatchEvent(new CustomEvent("stateChanged"))
    }
}
)

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "search-by-state") {
        let stateName = document.querySelector("input[id='search-breweries-state']").value
        let adjustedStateName = stateName.replace(/ /g,"_");
        fetchBreweriesByState(adjustedStateName)
        dashboard.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

export const breweryList = () => {
    
const breweries = getBreweries()
    return `<h3>Breweries</h3>
    ${breweries.map(brewery => {
        return`<div class="brewery-container">${brewery.name}</div>`
    }).join("")

 }`}