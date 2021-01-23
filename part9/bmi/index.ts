import express = require('express');
import {calculateBMI} from './bmiCalculator'
const app = express();

const PORT = 3002;

app.get('/', (_req, res) => {
    res.send(
        `<h1>BMI</h1>
<h2>Endpoints</h2>
<ul>
<li><a href="http://localhost:${PORT}/hello">Hello</a></li>
</ul>`
    );
});
app.get('/hello', (_re, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBMI(height, weight)
    res.send( {height, weight, bmi} );
    // res.send({ page: 'bmi', height });
});

app.listen(PORT, () => {
    console.log(`Server running locally at http://localhost:${PORT}`);
});
