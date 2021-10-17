const { res_statuses, res_err_messages, levels } = require('../configs/commons.config');

module.exports = {

  level_validator: (req, res, next) => {
    const level = req.params.level;
    let result = {
      success: '',
      value: '',
      err: ''
    }

    if (levels[level]) next();
    else {
      result.success = res_statuses.STATUS_FAIL;
      result.err = res_err_messages.LEVEL_NOT_VALID(level);
      res.send(result);
    }
  },

}