import React from 'react';

export default function ResultsList({ searchResults }){
  return(
    <div id="results-table">
      {searchResults.map((result, index) => {
        return <div className="result" key={`food-truck-result-${index}`}>
          <h4>{result.applicant}</h4>
          <p>{result.address}</p>
        </div>
      })}
    </div>
  )
}