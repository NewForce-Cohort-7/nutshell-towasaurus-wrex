import { getBreweries } from "./dataAccess.js";

const breweries = getBreweries()

export const BreweriesForm = () => {
    let html = `
    <label class="label" for="breweries-city">City</label>
    <input type="text" id="search-breweries-city" class="input"/>

    <label class="label" for="breweries-state">State</label>
        <input type="text" id="search-breweries-state" class="input"/>

        <button class="button" id="search-by-city">Search by City</button>
        <button class="button" id="search-by-state">Search by State</button>
    `
    return html
}

