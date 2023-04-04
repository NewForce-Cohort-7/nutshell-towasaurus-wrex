// CHUCK NORRIS API 
const chuckAPI = "https://api.chucknorris.io/jokes"

// CHUCK NORRIS FETCH: 
// returns a promise that resolves with the value of a random Chuck Norris fact
export const fetchRandomFact = () => {
    return fetch(`${chuckAPI}/random`)
      .then(response => response.json())
      .then(parsedResponse => {
        return parsedResponse.value
      })
  }
  

