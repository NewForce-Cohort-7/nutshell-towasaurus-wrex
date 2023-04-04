// Responsbility: Manage application state and provide functions to change permanent state with fetch() calls to the API.

const API = "http://localhost:8088"
const dashboard = document.querySelector("#dashboard")

const applicationState = {
    users: [],
    articles: [],
    events: [],
    tasks: [],
    messages: [],
    photos: [],

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
    return applicationState.articles.map(articles => ({ ...articles }))
        .sort((articleA, articleB) => new Date(articleB.date) - new Date(articleA.date));
}


export const deleteArticles = (id) => {
    return fetch(`${API}/articles/${id}`, { method: "DELETE" })
        .then(() => {
            dashboard.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const saveArticles = (article) => {
    const fetchOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(article)
    }

    return fetch(`${API}/articles`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            dashboard.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const fetchEvents = () => {
    return fetch(`${API}/events`)
        .then(response => response.json())
        .then((responseArray) => { applicationState.events = responseArray })
}

export const getEvents = () => {
    let jumbledEvents = applicationState.events.map(obj => ({ ...obj }))
    let sortedEvents = jumbledEvents.sort((a , b) =>
    new Date(a.date) - new Date(b.date)
  )
    return sortedEvents
}

export const fetchTasks = () => {
    return fetch(`${API}/tasks`)
        .then(response => response.json())
        .then((responseArray) => { applicationState.tasks = responseArray })
}

//TASKS

export const getTasks = () => {
    return applicationState.tasks.map(obj => ({ ...obj }))
}

export const sendTask = (taskData) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskData)
    }


    return fetch(`${API}/tasks`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            dashboard.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteTask = (id) => {
    return fetch(`${API}/tasks/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const markTaskComplete = (id) => {

    //update API with complete attribute marked true with PATCH fetch method
    fetch(`${API}/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          complete: true,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then(() => dashboard.dispatchEvent(new CustomEvent("stateChanged")));
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

export const deleteMessage = (id) => {
    return fetch(`${API}/messages/${id}`, { method: "DELETE" })
        .then(() => {
            dashboard.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteImage = (id) => {
    return fetch(`${API}/photos/${id}`, { method: "DELETE" })
        .then(() => {
            dashboard.dispatchEvent(new CustomEvent("stateChanged"))
        })
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

export const thumbsUpMessage = (id) => {

    //grab current thumbsUp count from active state and add one to it
    let newThumbsUpCount = 0
    for (const message of applicationState.messages) {
        if (message.id === id) {
            newThumbsUpCount = message.thumbsUp + 1
        }
    }

    //update API with new value with PATCH fetch method
    fetch(`${API}/messages/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          thumbsUp: newThumbsUpCount,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then(() => dashboard.dispatchEvent(new CustomEvent("stateChanged")));
}

export const thumbsDownMessage = (id) => {

    //grab current thumbsUp count from active state and add one to it
    let newThumbsDownCount = 0
    for (const message of applicationState.messages) {
        if (message.id === id) {
            newThumbsDownCount = message.thumbsDown + 1
        }
    }

    //update API with new value with PATCH fetch method
    fetch(`${API}/messages/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          thumbsDown: newThumbsDownCount,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then(() => dashboard.dispatchEvent(new CustomEvent("stateChanged")));
}
export const saveEvent = (event) => {
    const fetchOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(event)
    }

    return fetch(`${API}/events`, fetchOptions)
            .then(response => response.json)
            .then(() => {
                dashboard.dispatchEvent(new CustomEvent("stateChanged"))
            })
}

export const deleteEvent = (id) => {
    return fetch(`${API}/events/${id}`, { method: "DELETE" })
        .then(() => {
            dashboard.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
