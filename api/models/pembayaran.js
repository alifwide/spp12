'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  };
  pembayaran.init({
    id_pembayaran: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_petugas: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'petugas',
        key: 'id_petugas',
      }
    },
    nisn: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: 'siswa',
        key: 'nisn'
      }
    },
    tgl_bayar: DataTypes.DATE,
    bulan_spp: DataTypes.INTEGER,
    tahun_spp: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'pembayaran',
    timestamps: false,
  });
  return pembayaran;
};