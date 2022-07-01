const express = require('express');
const cors = require('cors');
const morgan = require ('morgan');

const app = express();
const passport = require('./passport-strategies/bearer')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));


// connect to mongodb
require('./db/connect');

const apiUser = require('./routes/user.api');
const apiTodo = require('./routes/todo.api')

app.use('/api/v1', apiUser);
app.use('/api/v1', apiTodo)



app.listen(process.env.port || 3000, function(){
  console.log('now listening for requests');
})