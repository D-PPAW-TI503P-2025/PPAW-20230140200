'use strict';
const { Model } = require('sequelize');
const { Sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
  class Presensi extends Model {
    static associate(models) {
      Presensi.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  Presensi.init(
    {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"

      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      checkIn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      checkOut: {
        type: DataTypes.DATE,
        allowNull: true, // bisa null
      }
    },
    {
      sequelize,
      modelName: "Presensi",
      tableName: "presensis", // opsional: sesuaikan dengan nama tabel di DB
      timestamps: false,      // matikan createdAt dan updatedAt
    }
  );

  return Presensi;
};
