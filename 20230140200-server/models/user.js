'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // kalau nanti mau ada relasi, tambahkan di sini
    }
  }

  User.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('mahasiswa', 'admin'),
        allowNull: false,
        defaultValue: 'mahasiswa',
        validate: {
          isIn: [['mahasiswa', 'admin']],
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users', // pastikan sama dengan nama tabel di database
      timestamps: false,  // ⛔ nonaktifkan createdAt dan updatedAt
    }
  );

  return User;
};
