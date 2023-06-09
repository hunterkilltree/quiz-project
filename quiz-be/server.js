import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';

import connect from './database/conn.js';

const app = express()

/** app middlewares */
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();

/** application port */
const port = process.env.PORT || 8080;



/** routes */
app.use('/api', router); /** apis */

app.get('/', (req, res) => {
  try {
    res.json("Get request");

  } catch (error) {
    res.json(error);
  }
})

/** connect mongoose db */
connect().then(()=> {
  try {
  app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`);
  })
 } catch (error) {
    console.log("Cannot connect to server", error);
  }
}).catch(error => {
  console.log("Invalid Database connection", error);
})
