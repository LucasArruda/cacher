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

app.get(`${API_URL}has/:key`, (req : Request, res : Response) => {
  const key : string = req.params.key;
  const result : boolean = Cacher.has(key);

  res.status(200).send({
    success: 'true',
    message: result ? 'Object found' : 'Object not found',
    result: result ? 'Object found' : 'Object not found'
  });
});

app.post(`${API_URL}set`, (req : Request, res : Response) => {
  const key : string = req.body.key;
  const value : string = req.body.value;
  Cacher.set(key, value);

  res.status(200).send({
    success: 'true'
  });
});

app.delete(`${API_URL}remove/:key`, (req : Request, res : Response) => {
  const key : string = req.params.key;
  const result : boolean = Cacher.del(key);

  if (ok(result)) {
    res.status(200).send({
      success: 'true',
      message: 'Object deleted'
    });
  } else {
    res.status(404).send({
      success: 'false',
      message: 'Object not found or could not be deleted',
      error: `Object with key "${key}" was not found or could not be deleted`
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});