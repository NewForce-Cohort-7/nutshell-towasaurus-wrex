// chuckNorrisFact.js

import { fetchRandomFact } from './apiAccess.js';

const createChuckNorrisFactModule = fact => `
  <div id="fact-container">
    <h2>Random Chuck Norris Fact</h2>
    <p>${fact}</p>
  </div>
`;

export const renderChuckNorrisFactModule = () => {
  return fetchRandomFact()
    .then(fact => {
      const factHTML = createChuckNorrisFactModule(fact);
      return factHTML;
    })
    .catch(error => {
      console.error('Error displaying fact:', error);
      return `
        <div id="fact-container">
          <h2>Error</h2>
          <p>Failed to fetch a random Chuck Norris fact.</p>
        </div>
      `;
    });
};
