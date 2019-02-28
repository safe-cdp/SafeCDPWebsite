require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY;

const isLoggedIn = (req, res, next) => {
  if (req.body.token) {
    const token = req.body.token;
    jwt.verify(token, secret, (err, decodedToken) => {
      err ? res.status(401).json({ message: 'Invalid token!' }) : next();
    });
  } else {
    res.status(403).json({ error: 'FORBIDDEN!!!' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.body.token) {
    const token = req.body.token;
    jwt.verify(token, secret, (err, decodedToken) => {
      !decodedToken.admin
        ? res
            .status(403)
            .json({ message: 'You have no permission to access this data!' })
        : next();
    });
  } else {
    res.status(403).json({ error: 'FORBIDDEN!!!' });
  }
};

const isValidEmail = (req, res, next) => {
  req.body.email.match(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? next()
    : res.status(400).json({
        message: 'Invalid email account, please verify your data and try again!'
      });
};

const isValidPassword = (req, res, next) => {
  req.body.password.match(
    /^(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!?<>-_]).*$/
  )
    ? next()
    : res.status(400).json({
        message:
          'Password must be at least 8 characters long and contain one lowercase letter, one uppercase letter, one number and one special character!'
      });
};

module.exports = { isLoggedIn, isAdmin, isValidEmail, isValidPassword };
