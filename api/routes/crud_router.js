const app = require('express')();
const bodyParser = require('body-parser');
const crud = require('../crud/crud');
const { table_validator } = require('../crud/helpers');

app.use(bodyParser.urlencoded({
  extended: false
}));

/* 
  some of the function is using dedicated function
  some of them using execute(), which is just a function that will execute any query passed into it
*/

app.get('/:tableName', table_validator, async (req, res) => {

  const tableName = req.params.tableName;

  const result = await crud.findAll(tableName);

  res.send(result);

});

app.post('/:tableName', table_validator, async (req, res) => {

  const tableName = req.params.tableName;
  const {
    payloadData
  } = req.body;

  const result = await crud.insert(tableName, payloadData);

  res.send(result);

});

app.delete('/:tableName', table_validator, async (req, res) => {

  const tableName = req.params.tableName;
  const {
    whereClause
  } = req.body;

  const result = await crud.remove(tableName, whereClause);

  res.send(result);

});

app.put('/:tableName', table_validator, async (req, res) => {

  const tableName = req.params.tableName;
  const {
    payloadData,
    whereClause
  } = req.body;

  const result = await crud.update(tableName, payloadData, whereClause);

  res.send(result);

});

app.get('/msc/tableInfo/:tableName', table_validator, async (req, res) => {
  
  const tableName = req.params.tableName;
  const result = await crud.getColumns(tableName);

  res.send(result);
})

app.post('/msc/execute/', async (req, res) => { //for more complex queriess

  const query = req.body.payloadData.query;
  const result = await crud.execQuery(query);
  
  res.send(result);

})

module.exports = app;