const express = require('express');
const cors = require('cors');
const fs = require('fs'); // File system module
const app = express();
const port = 3000;

app.use('/', express.static('public'));
app.use(cors());

// Load budget data from budget.json
const budget = JSON.parse(fs.readFileSync('budget.json', 'utf8'));

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});
