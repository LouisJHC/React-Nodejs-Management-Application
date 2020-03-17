const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const multer = require('multer');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const fs = require('fs');
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const sql = require('mysql');

const dbConnection = sql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
}); 

const upload = multer({
  dest: './upload'
})

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)";
  // the non-duplicated file name will be set by multer library.
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let gender = req.body.gender;
  let city = req.body.city;
  let job = req.body.job;
  let params = [image, name, gender, city, job];

  dbConnection.query(sql, params, (err, row, field) => {
    res.send(row);
  });

});


dbConnection.connect();
app.get('/api/customers', (req, res) => {
    dbConnection.query(
      'SELECT * FROM CUSTOMER WHERE isDeleted = 0',
      (err, row, field) => {
        res.send(row);
      }
    );
});

app.delete('/api/customers/:id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id=?';
  // req.params is for the route parameters, not the form data as in app.post where name = req.body.name for example.
  let params = req.params.id;

  dbConnection.query(sql, params, (err, row, field) => {
    res.send(row);
  });

});

app.listen(port, () => {
    // using ` instead of ' to print out the variable ${} inside the string.
    console.log(`Listening on port ${port}`);
});