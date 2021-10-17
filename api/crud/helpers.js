const { tables } = require('./schemas');
const {
  res_statuses,
  res_err_messages
} = require('../configs/commons.config');


module.exports = {


  table_validator: (req, res, next) => {
    const tableName = req.params.tableName;
    let result = {
      success: '',
      value: '',
      err: ''
    }

    if (tables[tableName]) next();
    else {
      result.success = res_statuses.STATUS_FAIL;
      result.err = res_err_messages.TABLE_NOT_FOUND(tableName);
      res.send(result);
    }
  }


}