const jwt = require('jsonwebtoken');
const common_configs = require('../configs/commons.config');

const { levels, jwt_keys, res_statuses, res_err_messages } = common_configs;
const { ADMIN_KEY, PETUGAS_KEY, SISWA_KEY } = jwt_keys;

const admin_auth_handler = ( req, res, next ) => {
  
  const token = req.headers.authorization.split(' ')[1];
  const result = authenticate(token, levels.admin)

  if(result.status == res_statuses.STATUS_SUCCESS) next();
  else res.send(result);

}

const petugas_auth_handler = ( req, res, next ) => {
  
  const token = req.headers.authorization.split(' ')[1];
  const result = authenticate(token, levels.petugas)

  if(result.status == res_statuses.STATUS_SUCCESS) next();
  else res.send(result);

}

const siswa_auth_handler = ( req, res, next ) => {
  
  const token = req.headers.authorization.split(' ')[1];
  const result = authenticate(token, levels.siswa)

  if(result.status == res_statuses.STATUS_SUCCESS) next();
  else res.send(result);

}

const authenticate = (jwtString, level) => {

  let jwtKey = 'invalid key';
  let result = {
    status: '',
    value: '',
    err: ''
  }

  switch(level){
    case levels.admin : 
      jwtKey = ADMIN_KEY;
      break;
    case levels.petugas : 
      jwtKey = PETUGAS_KEY;
      break;
    case levels.siswa : 
      jwtKey = SISWA_KEY;
      break;
  }

  try{
    const jwtIsValid = jwt.verify( jwtString, jwtKey );
    result.status = res_statuses.STATUS_SUCCESS;
  }catch(err){
    result.status = res_statuses.STATUS_FAIL;
    result.err = res_err_messages.INVALID_TOKEN;
  }

  return result;

} 

module.exports = {
  admin_authenticate: admin_auth_handler,
  petugas_authenticate: petugas_auth_handler,
  siswa_authenticate: siswa_auth_handler
}