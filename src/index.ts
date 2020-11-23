import Cacher from './cacher';
import { Console } from 'console';

const API_URL = '/api/v1/';
const express = require( "express" );
const app = express();

const ok = (obj: Object | undefined): boolean => (typeof obj !== 'undefined') && obj !== null;

app.get(`${API_URL}get/:key`, (req, res) => {
  const key : string = req.params.key;
  const result: Object | undefined = Cacher.get(key);

app.get(`${API_URL}has/:key`, (req, res) => {
  const key : string = req.params.key;
  const result : boolean = Cacher.has(key);

  res.status(200).send({
    success: 'true',
    message: result ? 'Object found' : 'Object not found',
    data: result ? 'Object found' : 'Object not found'
  });
});

  if (ok(result)) {
    res.status(200).send({
      success: 'true',
      message: 'Object retrieved',
      object: result
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