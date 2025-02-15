import { DataTypes, Model } from 'sequelize';

export default class Tour extends Model {
  static initialize(sequelize) {
    Tour.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        fullDescription: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        dateStart: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        dateEnd: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        nights: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        image: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        deleted: {
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
        modelName: 'Tour',
        tableName: 'tours',
        timestamps: true,
        paranoid: true,
      }
    );
  }
}
