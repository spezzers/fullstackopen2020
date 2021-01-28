import express from 'express';
import cors = require('cors');
import patientsRouter from './routes/patientsRoute';
import diagnosesRouter from './routes/diagnosesRoute';
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;
const devEnv = process.env.NODE_ENV === 'development';

app.get('/api/ping', (_req, res) => {
    res.send('patientor pong');
});

app.use('/api/patients', patientsRouter);
app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
    const isDev = devEnv ? '\n=-=-=-  DEVELOPMENT ENVIRONMENT  -=-=-=' : '';
    console.log(`${isDev}

Server running at http://localhost:${PORT}`);
});
