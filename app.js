const express = require('express');
const app = express();
const cors = require('cors');

// allow cors
// TODO: figure out a better way to handle this in prod
app.use(cors());

app.get('/api/v1/products', (req, res) => {
  res.status(200).json({
    products: [
      { id: 1, name: 'wooden chair' },
      { id: 2, name: 'fan' },
    ],
  });
});

const port = 4000;

app.listen(port, console.log(`Server listening on port ${port}...`));
