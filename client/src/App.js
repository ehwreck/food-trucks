import './App.css';
import {useEffect, useState} from 'react';
import Search from './components/search.component';
import ResultsList from './components/results-list.component';

function App() {

  const [searchType, setSearchType] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:3001/")
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.data);
      })
  },[])

  useEffect(()=>{
    fetch("http://localhost:3001/")
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.data);
      })
  },[searchText, searchType])

  return (
    <div className="App">
      <h1>Food Truck Locator</h1>
      <Search placeholder='Search Food Trucks...' className='' setSearchText={setSearchText}/>
      <ResultsList searchResults={searchResults}/>
    </div>
  );
}

export default App;
