// apiAccess.js
const chuckAPI = "https://api.chucknorris.io/jokes"

export const fetchRandomFact = () => {
  return fetch(`${chuckAPI}/random`)
    .then(response => response.json())
    .then(parsedResponse => {
      return parsedResponse.value
    })
}