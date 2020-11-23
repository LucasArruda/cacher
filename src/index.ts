import Cacher from './cacher';
import express from 'express';
import { Router, Request, Response, NextFunction } from 'express';

const API_URL = '/api/v1/';
const app = express();


const ok = (obj: Object | undefined): boolean => (typeof obj !== 'undefined') && obj !== null;

app.get(`${API_URL}get/:key`, (req : Request, res : Response) => {
  const key : string = req.params.key;
  const result : Object | undefined = Cacher.get(key);

  if (ok(result)) {
    res.status(200).send({
      success: 'true',
      message: 'Object retrieved',
      result: result
    });
  } else {
    res.status(404).send({
      success: 'false',
      message: 'Object not found',
      error: `Object was not found with key: ${key}`
    });
  }
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});