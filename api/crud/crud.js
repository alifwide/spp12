const model = require('../models/index')
const { res_statuses } = require('../configs/commons.config');

/*
  resolve schema : 
  {
    status
    value
    err
  }
*/


const findOne = async (tableName, where) => {

  let result = {
    status: '',
    value: '',
    err: ''
  }

  return new Promise(async (resolve) => {
    try {
      result.value = await model[tableName].findOne({
        raw: true,
        where: where
      });
    } catch (err) {
      result.err = err.message;
    }
    if (result.err) result.status = res_statuses.STATUS_FAIL;
    else result.status = res_statuses.STATUS_SUCCESS;
    resolve(result);
  });

}


const findAll = (tableName) => {

  let result = {
    status: '',
    value: '',
    err: ''
  }

  return new Promise(async (resolve) => {
    try {
      result.value = await model[tableName].findAll({
        raw: true
      });
    } catch (err) {
      result.err = err.message;
    }
    if (result.err) result.status = res_statuses.STATUS_FAIL;
    else result.status = res_statuses.STATUS_SUCCESS;
    resolve(result);
  });

}


const insert = (tableName, data) => {

  let result = {
    status: '',
    value: '',
    err: ''
  }

  return new Promise(async (resolve) => {
    try {
      result.value = await model[tableName].create(data, {
        raw: true
      });
    } catch (err) {
      result.err = err.message;
    }
    if (result.err) result.status = res_statuses.STATUS_FAIL;
    else result.status = res_statuses.STATUS_SUCCESS;
    resolve(result);
  });

}


const remove = async (tableName, where) => {

  let result = {
    status: '',
    value: '',
    err: ''
  }

  return new Promise(async (resolve) => {
    try {
      result.value = await model[tableName].destroy({
        raw: true,
        where: where
      });
    } catch (err) {
      result.err = err.message;
    }
    if (result.err) result.status = res_statuses.STATUS_FAIL;
    else result.status = res_statuses.STATUS_SUCCESS;
    resolve(result);
  });

}


const update = async (tableName, data, where) => {

  let result = {
    status: '',
    value: '',
    err: ''
  }

  return new Promise(async (resolve) => {
    try {
      result.value = await model[tableName].update(data, {
        raw: true,
        where: where
      });
    } catch (err) {
      result.err = err.message;
    }
    if (result.err) result.status = res_statuses.STATUS_FAIL;
    else result.status = res_statuses.STATUS_SUCCESS;
    resolve(result);
  });

}

const getTableInfo = async (tableName) => {
  
  let result = {
    status: '',
    value: '',
    err: ''
  }


}

// const testExec = async () => {
//   const payloadData = {
//     angkatan : 28,
//     tahun: 2019,
//     nominal: 500000
//   }

//   const result = await insert('spp', payloadData);
//   console.log(result)
// }

// testExec()

module.exports = {
  findOne,
  findAll,
  insert,
  remove,
  update
}