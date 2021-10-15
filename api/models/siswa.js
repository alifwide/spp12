'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  };
  siswa.init({
    nisn: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false
    },
    nis: DataTypes.STRING,
    nama: DataTypes.STRING,
    id_kelas: {
      type: DataTypes.INTEGER,
      references: {
        model: 'kelas',
        key: 'id_kelas',
      }
    },
    alamat: DataTypes.STRING,
    no_telp: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'siswa',
    timestamps: false,
  });
  return siswa;
};