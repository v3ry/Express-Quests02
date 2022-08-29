const { body, validationResult } = require('express-validator');

const validateMovie = [
  body("title").isLength({ max: 255 }).not().isEmpty(),
  body("director").isLength({ max: 255 }).not().isEmpty(),
  body("year").isLength({max: 255 }).not().isEmpty(),
  body("color").isLength({max: 255 }).not().isEmpty(),
  body("duration").isInt().not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      
      next();
    }
  },
];

const validateUser = [
  body("firstname").isLength({ max: 255 }).not().isEmpty(),
  body("lastname").isLength({ max: 255 }).not().isEmpty(),
  body("email").isEmail().not().isEmpty(),
  body("city").isLength({ max: 255 }).not().isEmpty(),
  body("language").isLength({ max: 255 }).not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
      console.log(errors);
    } else {
      next();
    }
  },
];


module.exports = {
  validateMovie,
  validateUser,
};