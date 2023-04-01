// Responsbility: Manage application state and provide functions to change permanent state with fetch() calls to the API.

const API = "http://localhost:8088"
const dashboard = document.querySelector("#dashboard")

const applicationState = {
    users: [],
    articles: [],
    events: [],
    tasks: [],
    messages: [],
    photos: []
};

export const fetchUsers = () => {
    return fetch(`${API}/users`)
        .then(response => response.json())
        .then((responseArray) => { applicationState.users = responseArray })
}

export const getUsers = () => {
    return applicationState.users.map(obj => ({ ...obj }))
}

export const fetchArticles = () => {
    return fetch(`${API}/articles`)
        .then(response => response.json())
        .then((responseArray) => { applicationState.articles = responseArray })
}

export const getArticles = () => {
    return applicationState.articles.map(obj => ({ ...obj }))
}

export const fetchEvents = () => {
    return fetch(`${API}/events`)
        .then(response => response.json())
        .then((responseArray) => { applicationState.events = responseArray })
}

export const getEvents = () => {
    return applicationState.events.map(obj => ({ ...obj }))
}

export const fetchTasks = () => {
    return fetch(`${API}/tasks`)
        .then(response => response.json())
        .then((responseArray) => { applicationState.tasks = responseArray })
}

export const getTasks = () => {
    return applicationState.tasks.map(obj => ({ ...obj }))
}

export const fetchMessages = () => {
    return fetch(`${API}/messages`)
        .then(response => response.json())
        .then((responseArray) => { applicationState.messages = responseArray })
}

export const getMessages = () => {
    return applicationState.messages.map(obj => ({ ...obj }))
}

export const fetchPhotos = () => {
    return fetch(`${API}/photos`)
        .then(response => response.json())
        .then((responseArray) => { applicationState.photos = responseArray })
}

export const getPhotos = () => {
    return applicationState.photos.map(obj => ({ ...obj }))
}

export const saveMessage = (message) => {
    const fetchOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(message)
    }

    return fetch(`${API}/messages`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            dashboard.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteImage = (id) => {
    return fetch(`${API}/photos/${id}`, { method: "DELETE" })
        .then(
            () => {
                dashboard.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const saveImage = (newImageObject) => {
    const fetchOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newImageObject)
    }

    return fetch(`${API}/photos`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            dashboard.dispatchEvent(new CustomEvent("stateChanged"))
        })
}



