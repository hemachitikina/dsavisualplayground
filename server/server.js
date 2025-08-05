const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('DSA Playground Server is Running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
app.get('/api/message', (req, res) => {
  res.send('Hello from the backend!');
});

