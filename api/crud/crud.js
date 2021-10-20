const model = require('../models/index')
const { res_statuses } = require('../configs/commons.config');
const mysql_config = require('../configs/server.config').mysql;
const mysql = require('mysql2');


const con = mysql.createConnection(mysql_config);

/*
  resolve schema : 
  {
    status
    value
    err
  }
*/

//i cannot figure how to execute a normal mysql query with promise because the docs sucks
//so i make my own function
const execQuery = (con, query) => { 

  let result = {
    status: '',
    value: '',
    err: ''
  }
  
  return new Promise((resolve) => {

    con.query(query, (err, queryResult) => {

      if(err){
        result.status = res_statuses.STATUS_FAIL;
        result.err = err.message;
      }else{
        result.status = res_statuses.STATUS_SUCCESS;
        result.value = queryResult;
      }

      con.end();
      resolve(result);

    })

  })

}


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

const getColumns = async (tableName) => {
  
  let result = {
    status: '',
    value: '',
    err: ''
  }

  return new Promise(async (resolve) => {

    const query = 'show columns from ' + tableName;
    resolve(execQuery(con, query));

  })

}

// const testExec = async () => {
//   const payloadData = {
//     angkatan : 28,
//     tahun: 2019,
//     nominal: 500000
//   }

//   console.log(Object.values(JSON.parse(JSON.stringify(await getColumns('spp')))));
  
// }

// testExec()

module.exports = {
  findOne,
  findAll,
  insert,
  remove,
  update,
  getColumns,
}