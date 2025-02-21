import express from 'express';
import pg from 'pg';
import db from './models/index.js';
import AuthRoute from './routes/auth.js';
import UploadRoute from './routes/upload.js';
import corsConfig from './utils/cors.js';
import Tour from './routes/tour.js';
import Booking from './routes/booking.js';
import Reviews from './routes/reviews.js';

const { Client } = pg;
const app = express();
const PORT = process.env.PORT || 3000;

// Функция для создания базы данных
const createDatabaseIfNotExists = async () => {
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'postgres', // Подключаемся к системной базе для проверки
  });

  try {
    await client.connect();
    const dbName = process.env.DB_NAME;

    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

    if (res.rowCount === 0) {
      console.log(`Database "${dbName}" not found. Creating...`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully.`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }
  } catch (err) {
    console.error('Error checking or creating database:', err);
  } finally {
    await client.end();
  }
};

const startServer = async () => {
  console.log('DB_NAME:', process.env.DB_NAME);

  await createDatabaseIfNotExists(); // Создаем базу, если не существует

  // Синхронизация с базой данных
  db.sequelize.sync()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    })
    .catch(error => {
      console.error('Unable to connect to the database:', error);
    });
};

// Middlewares
app.use(corsConfig);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// Подключение маршрутов
app.use('/api/auth', AuthRoute);
app.use('/api/upload', UploadRoute);
app.use('/api/tours', Tour);
app.use('/api/bookings', Booking);
app.use('/api/reviews', Reviews);

startServer();
