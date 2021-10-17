const app = require('express')();

const authorize = require('../authorization/authorization');

app.post('/:level', async ( req, res ) => {
  
  const { level } = req.params;
  const { payloadData } = req.body;
  console.log(req.body)

  const result = await authorize(level, payloadData);

  res.send(result);

})

module.exports = app;