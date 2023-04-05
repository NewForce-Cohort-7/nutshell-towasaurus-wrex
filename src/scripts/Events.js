import { getEvents, saveEvent, deleteEvent } from "./dataAccess.js";

const mainContainer = document.querySelector("#dashboard")

// click event that shows the new event form HTML
dashboard.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "createNewEvent") {
        document.querySelector("#new-event-form").innerHTML = eventForm()
    }
})
  //click event that deletes and event
dashboard.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("delete-event--")){ 
        deleteEvent(parseInt(clickEvent.target.value))
    }
})

const getMonthName = (monthNum) => {
    const date = new Date()
    date.setMonth(monthNum - 1)
    return date.toLocaleString('en-US', { month: 'long' })
}

const createEventList = (events) => {
    
    return `${events.map(event => {
        return `<div class="event-container" id="${event.id}">
        <div class="event-name">${event.name}</div>
        <div class="event-date">${event.date}</div>
        <div class="event-location">${event.location}</div>
        <button class="even-delete-button" id="delete-event--${event.id}" value="${event.id}">Delete</button>
        </div>`
    }).join("")
}`}

const eventsByMonth = () => {
    const events = getEvents()
    
    let HTMLstring = ""
    for(let i = 1; i < 13; i++){
        const monthlyEvents = []
        let eventCount = 0
        events.forEach(event => {
            const [,eventMonth] = event.date.split("-")
            if(parseInt(eventMonth) === i){
                monthlyEvents.push(event)
                eventCount++
            }
        })
        // console.log(monthlyEvents)
        if(eventCount !== 0){
        HTMLstring += `<h3>${getMonthName(i)} (${eventCount})</h3>
                    ${createEventList(monthlyEvents)}
        
        `
        }
    }
    return HTMLstring
}


export const listOfEvents = () => {
    return `<div class="event-list"><h2>Events</h2>
    ${eventsByMonth()}
    </div>
    <div id="new-event-form"></div>
    <button class="button" id="createNewEvent">Create New Event</button>
    `
}

    
    // Create form to add event
    export const eventForm = () => {
        let html = `
        <label class="label" for="event-name">Event</label>
        <input type="text" id="new-event-name" class="input"/>
        
        <label class="label" for="event-location">Location</label>
        <input type="text" id="new-event-location" class="input"/>
        
        <label class="label" for="event-date">Date</label>
        <input type="date" id="new-event-date" class="input">
        
        <button class="button" id="createEvent">Add a New Event</button>
        `
        return html
    }
    
    // Create button to save event to API
    mainContainer.addEventListener("click", clickEvent => {
        if (clickEvent.target.id === "createEvent") {
            const eventName =  document.querySelector("input[id='new-event-name']").value
            const eventDate =  document.querySelector("input[id='new-event-date']").value
            const eventLocation = document.querySelector("input[id='new-event-location']").value
            
            // Create function that indicates what data to save
            if(!eventName || !eventDate || !eventLocation){
                window.alert('Please enter a valid event name, date, and location before trying to save')
            return
        }
        else{const newEventData = {
            name: eventName,
            date: eventDate,
            location: eventLocation
        }
        saveEvent(newEventData)
    }
    }
})