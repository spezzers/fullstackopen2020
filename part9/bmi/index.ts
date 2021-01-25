import express = require('express');
import {calculateBMI} from './bmiCalculator';
import {calculateExercise} from './exerciseCalculator'
const app = express();
app.use(express.json())

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
    const result = (): {height: number, weight: number, bmi: string} => {
        const height = Number(req.query.height);
        const weight = Number(req.query.weight);
        const bmi = calculateBMI(height, weight);
        if (!height || !weight || isNaN(height) || isNaN(weight)) {
            throw {error: 'malformatted parameters'};
        }
        return {height, weight, bmi};
    };
    try {
        res.send( result() );
    } catch (error) {
        res.status(400).send(error);
    }
});


type ExerciseResult = {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

app.post('/exercise', (req, res) => {
    const result = (): ExerciseResult => {
        const daily_exercises: number[] = req.body.daily_exercises
        const target: number = req.body.target
        return calculateExercise([target, ...daily_exercises])
    }
    res.json(result())
})

app.listen(PORT, () => {
    console.log(`Server running locally at http://localhost:${PORT}`);
});
