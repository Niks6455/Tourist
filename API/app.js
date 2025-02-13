import express from 'express';
import db from './models/index.js';
import AuthRoute from './routes/auth.js';
import UploadRoute from './routes/upload.js';
import corsConfig from './utils/cors.js';
import Tour from './routes/tour.js';
import Booking from './routes/booking.js';
import Reviews from './routes/reviews.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Подключение маршрутов
app.use(corsConfig);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use('/auth', AuthRoute);
app.use('/upload', UploadRoute);
app.use('/tours', Tour);
app.use('/bookings', Booking);
app.use('/reviews', Reviews);


// Синхронизация с базой данных
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
