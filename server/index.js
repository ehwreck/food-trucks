import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
import axios from 'axios';

// configuring env variables
dotenv.config()
const PORT = process.env.SERVER_PORT || 3001; //setting fallback port if environment variables are not setup

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// This will retrieve all food trucks
app.get('/', async (req, res) => {
  const response = (await axios.get("https://data.sfgov.org/resource/rqzj-sfat.json")).data.map(result => ({
    name: result.applicant,
    address: result.address,
    menu: result.fooditems
  }));
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send({ data: response });
})

app.post('/', async (req, res) => {
  const { searchText } = req.body;
  const searchKeywords = searchText.toLowerCase().split(' ');
  const foodTrucks = (await axios.get("https://data.sfgov.org/resource/rqzj-sfat.json")).data.map(result => ({
    name: result.applicant,
    address: result.address,
    menu: result.fooditems ? result.fooditems.split(':').map(item => item.trim()) : []
  }))

  foodTrucks.forEach(truck => {
    let relevance = 0;
    searchKeywords.forEach(keyword => {
      relevance += Object.values(truck).flat().filter(word => word.toLowerCase() === keyword || word.toLowerCase().includes(keyword)).length
    })
    truck.relevance = relevance;
  })

  const sortedResultsByRelevance = foodTrucks.filter(truck => truck.relevance > 0).sort((a, b) => {
    if (a.relevance > b.relevance) {
      return -1;
    } else {
      return 1;
    }
  })

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send({ data: sortedResultsByRelevance });
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
