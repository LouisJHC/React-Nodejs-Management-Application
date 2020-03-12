const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', (req, res) => {
    res.send([
          {
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name': 'Louis',
            'job': 'Software Developer'
          },
          {
            'id': 2,
            'image': "https://placeimg.com/64/64/2",
            'name': 'Thomas',
            'job': 'Graphic Designer'
          },
          {
            'id': 3,
            'image': "https://placeimg.com/64/64/3",
            'name': 'Emily',
            'job': 'Business Analyst'
          }
    ]);
});

app.listen(port, () => {
    // using ` instead of ' to print out the variable ${} inside the string.
    console.log(`Listening on port ${port}`);
})