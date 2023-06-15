import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config'

const PORT = process.env || 3000; //setting fallback port if environment variables are not setup

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
