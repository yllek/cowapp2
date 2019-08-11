const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cow'
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
});

const app = express();

//when someone makes get or post request to url

app.get('/allcows', function(req, res) {
  con.query('SELECT * FROM cows', function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json({ cows: data });
    }
  });
});

app.post('/postcow', function(req, res) {
  con.query(
    `INSERT INTO cows (name, description) VALUES ("{req.body.name}","{req.body.description}")`,
    function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send('cow posted!');
      }
    }
  );
});

app.use(express.static(path.join(__dirname, '../client/dist')));

const PORT = 5000;

//To prevent server routing - react-router will handle the routing

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
