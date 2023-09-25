const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(cors());
const budget = {
    "myBudget": [
        {
            "title": "Eat out",
            "budget": 25
        },
        {
            "title": "Rent",
            "budget": 275
        },
        {
            "title": "Grocery",
            "budget": 110
        },
        {
            "title": "Transportation",
            "budget": 60
        },
        {
            "title": "Entertainment",
            "budget": 50
        },
        {
            "title": "Utilities",
            "budget": 120
        },
        {
            "title": "Insurance",
            "budget": 100
        }
    ]
}


// Serve static files
//app.use(express.static(__dirname));
//app.use('/', express.static('public'));
// Endpoint to serve budget.json

app.get('/budget', (req, res) => {
    fs.readFile('budget.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading budget.json');
            return;
        }
        res.send(JSON.parse(data));
    });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});
