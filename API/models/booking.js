import { DataTypes, Model } from 'sequelize';

export default class Booking extends Model {
  static initialize(sequelize) {
    Booking.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
        },
        tourId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'tours', key: 'id' },
        },
        status: {
          type: DataTypes.ENUM('pending', 'confirmed', 'canceled'),
          allowNull: false,
          defaultValue: 'pending',
        },
        comment: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        countPeople: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        phoneNumber: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        transferRequired: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      }, 
      {
        sequelize,
        schema: 'public',
        modelName: 'Booking',
        tableName: 'bookings',
        timestamps: true,
        paranoid: true,
      }
    );
  }
}