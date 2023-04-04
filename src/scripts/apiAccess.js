const chuckAPI = 'https://api.chucknorris.io';

export const fetchRandomFact = () => {
  return fetch(`${chuckAPI}/jokes/random`)
    .then(response => response.json())
    .then(data => data.value)
    .catch(error => {
      console.error('Error fetching fact:', error);
      throw error;
    });
}