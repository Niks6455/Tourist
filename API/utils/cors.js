import cors from 'cors';

export default cors({
    credentials: true,
    origin: ['http://localhost:3001', 'http://localhost:5173'],
    exposedHeaders: '*',
    allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
});