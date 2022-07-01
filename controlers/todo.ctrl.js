const Todo = require('../models/todo');

exports.create = async (req, res, next) => {
  try {
    const todo = new Todo({
      name: req.body.name,
      description: req.body.description
    });
    await Todo.create(todo)
    res.send({ message: 'saved' });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message || 'some error occured while creating the todo'
    });
  }
}

exports.addId = async (req, res) => {
  try {
    const affect = await Todo.findByIdAndUpdate(req.params.idTodo, { $push: { todos: req.params.idUser } }, { new: true });
    res.send({ message: 'user affected to todo' });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured while creating user'
    })
  }
}



exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured while creating the todo'
    });
  }
}

exports.getTodoById = async (req, res)=>{
  try {
    const todo = await Todo.findById(req.params.idTodo);
    res.send(todo);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured while creating the todo'
    });
  }
}

exports.updateTodoById = async (req, res)=>{
  try {
    const todoUpdate = await Todo.findByIdAndUpdate(req.params.idTodo);
    res.send({message: 'todo updated'});
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured while creating the todo'
    });
  }
}

exports.deleteById = async (req, res)=>{
  try {
    const todoDelete = await Todo.findByIdAndRemove(req.params.idTodo);
    res.send({message: 'todo deleted'});
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured while creating the todo'
    });
  }
}