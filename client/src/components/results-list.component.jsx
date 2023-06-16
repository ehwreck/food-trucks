import React from 'react';

export default function ResultsList({ searchResults }){
  
  const chunkSize = 12;
  const display = searchResults.slice(0, chunkSize);

  return(
    <div id="results-table">
      {display.map((result, index) => {
        return <div className="result" key={`food-truck-result-${index}`}>
          <h4>{result.name}</h4>
          <p>{result.address}</p>
        </div>
      })}
    </div>
  )
}