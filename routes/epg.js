import express from 'express'
import {buildxml} from '../services/xmlBuilder.js'

const api = express.Router();

api.get('/api/epg/:seriestype', epgGenerator);

async function epgGenerator(req, res) {
  const { seriestype } = req.params;
  try {
    const xml = await buildxml(seriestype);
    res.setHeader('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export default api;