const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
   const userFound = await User.findOne({email: req.body.email})
   console.log(userFound);
    if (userFound) {
      return  res.send({ message: 'the email address is already in use' });
    }
    else {
      const salt = 10
      const hash = bcrypt.hashSync(req.body.password, salt);
     
      req.body.password=hash
      User.create(req.body);
      res.json({ message: 'User created!' });
    }
  }
  catch (error) {
    res.status(500).json({
      message: error.message || 'some error occured while creating user'
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const userFound = await User.findOne({ email: req.body.email })
    if (!userFound) {
      return res.status(401).send({ message: 'email ou mot de passe incorrecte' });
    }
    const valid = bcrypt.compare(req.body.password, userFound.password)
    if (!valid) {
      return res.status(401).send({ message: 'email ou mot de passe incorrecte' });
    }
    res.status(200).send({message: {
       userId: userFound._id,
       token: jwt.sign(
        { userId: userFound._id },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
    )}
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}
