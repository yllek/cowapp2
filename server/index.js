const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

const PORT = 5000;

//To prevent server routing - react-router will handle the routing

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
