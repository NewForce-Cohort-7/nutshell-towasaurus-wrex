import { getEvents, saveEvent } from "./dataAccess.js";



dashboard.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "createEventButton") {
        document.querySelector("#dashboard").innerHTML = eventForm()
    }
})
  
export const listOfEvents = (event) => {
        const events = getEvents()
        return `
        ${events.map(event => {
            return `<div class="event-container" id="${event.id}">
                <div class="event-name">${event.name}</div>
                <div class="event-date">${event.date}</div>
                <div class="event-location">${event.location}</div>
                </div>`
        }).join("")
    }
    <button class="button" id="newEvent-button">Create New Event</button>
        `
    }

// Create button to create event
// Create form to add event
// Create button to save event to API
// Create function that indicates what data to save
const mainContainer = document.querySelector("#dashboard")

export const eventForm = () => {
    let html = `
    <label class="label" for="event-name">Event</label>
    <input type="text" id="event-name" class="input"/>

    <label class="label" for="event-location">Location</label>
    <input type="text" id="event-location" class="input"/>
    
    <label class="label" for="event-date">Date</label>
    <input type="date" id="event-date" class="input">

    <button class="button" id="createEvent">Add a New Event</button>
    `
    return html
}

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "createEvent") {
        const newEventData = {
            name: document.querySelector("input[name='event-name']").value,
            date: document.querySelector("input[name='event-date']").value,
            location: document.querySelector("input[name='event-location']").value
        }

        saveEvent(newEventData)
    }
})