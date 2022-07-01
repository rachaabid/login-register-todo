const express = require('express');
const router = express.Router();
const {create, getTodos, getTodoById, updateTodoById, deleteTodo, addId} = require('../controlers/todo.ctrl');
const passport = require('passport')

router.post('/todos', passport.authenticate('bearer', {session: false}),  create);

router.get('/todos', passport.authenticate('bearer', {session: false}),getTodos);

router.get('/todos/:idTodo', passport.authenticate('bearer', {session: false}),getTodoById);

router.put('/todos/:idTodo', passport.authenticate('bearer', {session: false}),updateTodoById);

router.delete('/todos/:idTodo', passport.authenticate('bearer', {session: false}),deleteTodo);

router.put('/todos/affect/:idTodo/:idUser', passport.authenticate('bearer', {session: false}),addId);

module.exports = router;