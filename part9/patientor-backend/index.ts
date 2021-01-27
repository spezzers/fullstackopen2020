import express from 'express';
const app = express();
app.use(express.json());

const PORT = 3000;
const devEnv = process.env.NODE_ENV === 'development';

app.get('/ping', (_req, res) => {
    res.send('patientor pong');
});

app.listen(PORT, () => {
    const isDev = devEnv ? '\n=-=-=-  DEVELOPMENT ENVIRONMENT  -=-=-=' : '';
	console.log(`${isDev}
Server running at http://localhost:${PORT}`);
});