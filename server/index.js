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
  const response = await axios.get("https://data.sfgov.org/resource/rqzj-sfat.json")
  console.log({ data: response.data });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send({ data: response.data });
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
