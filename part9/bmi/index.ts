import express = require('express');
const app = express();

const PORT = 3003;

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

app.listen(PORT, () => {
    console.log(`Server running locally at http://localhost:${PORT}`);
});
