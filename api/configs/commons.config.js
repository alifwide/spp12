module.exports = {

  res_statuses : {
    STATUS_FAIL: 'fail',
    STATUS_SUCCESS: 'success'
  },

  res_err_messages: {
    TABLE_NOT_FOUND: tableName => `cannot found table ${tableName}`,
    LEVEL_NOT_VALID: level => `level ${level} is not valid`,
    USERNAME_NOT_FOUND: username => `username ${username} not found`,
    NISN_NOT_FOUND: nisn => `NISN ${nisn} not found`,
    WRONG_PASSWORD: 'wrong password'
  },

  jwt_keys: {
    ADMIN_KEY: "569ef748b913bb8997eede11d7bd3c3f938f1fd873c56d03bb2f294a892f1171c94d4047125680347179f77a8cf64605",
    SISWA_KEY: "df14b18a1ecb073f5d3128f99167f10925760a8d892280a3e45c88c0f649f649c075344db2ca7474fb2bd4693609dd32",
    PETUGAS_KEY: "e4b5662ec8b878a09e63ef5d2f3a652028e5b35d5dd7d2a25d2659ec2b6259f7e086fea0e39a8fc3081848f4701e312d",
  },

  default_accounts: {
    ADMIN_DEFAULT_USER: 'admin',
    ADMIN_DEFAULT_PASS: '56f83f748sd913bb8997eeJFde1235d7bd3c3f938f1fd873c56d0gsjkJg9234afk2f1171cK4d4047125680FD47179f77a8cf6sFD605',
    PETUGAS_DEFAULT_USER: 'petugas',
    PETUGAS_DEFAULT_PASS: 'bukansiswapokoknyaseriusangakngehack'
  },

  levels: {
    admin: "admin",
    petugas: "petugas",
    siswa: "siswa",
  },

  tables: {
    spp: 'spp',
    kelas: 'kelas',
    siswa: 'siswa',
    pembayaran: 'pembayaran', 
    petugas: 'petugas'
  }

}