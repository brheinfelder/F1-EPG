import express from 'express';
import {port} from './config.js';
import api from './routes/epg.js'

const app = express();

app.use(express.json());

app.use(api);

app.listen(port, () => console.log(`Server running on port ${port}`));