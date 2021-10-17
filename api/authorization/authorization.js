const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const crud = require('../crud/crud');

const commons_config = require('../configs/commons.config');
const { levels } = require('./schemas');
const { tables } = require('../crud/schemas');
const { ADMIN_DEFAULT_USER, ADMIN_DEFAULT_PASS, PETUGAS_DEFAULT_USER, PETUGAS_DEFAULT_PASS } = commons_config.default_accounts;
const { ADMIN_KEY, PETUGAS_KEY, SISWA_KEY } = commons_config.jwt_keys;
const { res_statuses, res_err_messages } = commons_config;


//only for handler

const authorize_handler = async (level, data) => {

  const { username, password, nisn } = data;

  return new Promise(async (resolve) => {

    let result;
    switch (level) {

      case levels.admin :
       
        result = await authorize_admin(username, password);
        break;
  
      case levels.petugas:

        result = await authorize_petugas(username, password);
        break;

      case levels.siswa:

        result = await authorize_siswa(nisn);
        break;

    }

    resolve(result);

  })

}



const authorize_admin = (username, password) => {

  let result = {
    status: '',
    value: '',
    err: ''
  }

  return new Promise( async (resolve) => {

    if (username == ADMIN_DEFAULT_USER  && password == ADMIN_DEFAULT_PASS) {

      const token = jwt.sign({ level: levels.admin }, ADMIN_KEY, { expiresIn: '30d' });
      result.value = token;
      result.status = res_statuses.STATUS_SUCCESS;

    } else {

      const searchResult = await crud.findOne(tables.petugas, { username: username });
      const { err, value } = searchResult;

      if( err || !value ){

        result.status = res_statuses.STATUS_FAIL;
        result.err = err ? err : res_err_messages.USERNAME_NOT_FOUND(username);

      }else{

        const hashedPassword = value.password;
        const passwordIsCorrect = await bcrypt.compare( password, hashedPassword );

        if(passwordIsCorrect){

          const token = jwt.sign({ level: levels.admin }, ADMIN_KEY, { expiresIn: '30d' });
          result.value = token;
          result.status = res_statuses.STATUS_SUCCESS;

        }else{

          result.status = res_statuses.STATUS_FAIL;
          result.err = res_err_messages.WRONG_PASSWORD;

        }
      }
    }

    resolve(result);

  })

}


const authorize_petugas = (username, password) => {

  let result = {
    status: '',
    value: '',
    err: ''
  }

  return new Promise( async (resolve) => {

    if (username == PETUGAS_DEFAULT_USER  && password == PETUGAS_DEFAULT_PASS) {

      const token = jwt.sign({ level: levels.petugas }, PETUGAS_KEY, { expiresIn: '30d' });
      result.value = token;
      result.status = res_statuses.STATUS_SUCCESS;

    } else {

      const searchResult = await crud.findOne(tables.petugas, { username: username });
      const { err, value } = searchResult;

      if( err || !value ){

        result.status = res_statuses.STATUS_FAIL;
        result.err = err ? err : res_err_messages.USERNAME_NOT_FOUND(username);

      }else{

        const hashedPassword = value.password;
        const passwordIsCorrect = await bcrypt.compare( password, hashedPassword );

        if(passwordIsCorrect){

          const token = jwt.sign({ level: levels.admin }, PETUGAS_KEY, { expiresIn: '30d' });
          result.value = token;
          result.status = res_statuses.STATUS_SUCCESS;

        }else{

          result.status = res_statuses.STATUS_FAIL;
          result.err = res_err_messages.WRONG_PASSWORD;

        }
      }
    }

    resolve(result);

  })

}


const authorize_siswa = (nisn) => {

  let result = {
    status: '',
    value: '',
    err: ''
  }

  return new Promise( async (resolve) => {

    const searchResult = await crud.findOne(tables.siswa, { nisn: nisn });
    const { err, value } = searchResult;

    if( err || !value ){

      result.status = res_statuses.STATUS_FAIL;
      result.err = err ? err : res_err_messages.NISN_NOT_FOUND(nisn);

    }else{

      const token = jwt.sign({ level: levels.siswa }, SISWA_KEY, { expiresIn: '30d' });
      result.value = token;
      result.status = res_statuses.STATUS_SUCCESS;

    }

    resolve(result);

  })

}

// const testExec = async () => {
//   const data = {
//     username: 'siswa',
//     password: 'werta3321'
//   }
//   const result = await authorize_handler('siswa',data );
//   console.log(result);
// }

// testExec();

module.exports = authorize_handler;
