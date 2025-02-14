import { Sequelize } from 'sequelize';
import 'dotenv/config.js';
import User from './user.js';
import Booking from './booking.js';
import Tour from './tour.js';
import Review from './reviews.js';
const { DB_USER, DB_PWD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// Создание экземпляра Sequelize
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PWD, {
	host: DB_HOST,
	port: DB_PORT,
	dialect: 'postgres',
	define: {
		timestamps: true,
		underscored: true,
	},
	logging: false,
});

// Инициализация моделей
User.initialize(sequelize);
Tour.initialize(sequelize);
Booking.initialize(sequelize);
Review.initialize(sequelize);

// Добавление связей
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Tour.hasMany(Booking, { foreignKey: 'tourId' });
Booking.belongsTo(Tour, { foreignKey: 'tourId' });

Tour.hasMany(Review, { foreignKey: 'tourId' });
Review.belongsTo(Tour, { foreignKey: 'tourId' });

// Экспорт модели и sequelize instance
export const db = {
	sequelize,
	Sequelize,
	User,
	Tour,
	Booking,
	Review,
};

export default db;
