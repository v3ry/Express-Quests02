const { body, validationResult } = require('express-validator');

const validateMovie = [
  body("title").isLength({ max: 255 }).not().isEmpty(),
  body("director").isLength({ max: 255 }).not().isEmpty(),
  body("year").isLength({max: 255 }).not().isEmpty(),
  body("color").isLength({max: 255 }).not().isEmpty(),
  body("duration").isInt().not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log("test  tttttttttttttt"+errors);
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
// const validateMovie = (req, res, next) => {
  //   const { title,director,year,color,duration } = req.body;
  //   
  //   const errors = [];
  
  //   if (title == null) {
    //       errors.push({ field: "title", message: "This field is required" });
    //   }else if(title.length >= 255){
      //     errorsUser.push({ field: "title", message: "Title need to be less 255 characters" });
      //   }
      //   if(director == null ){
        //       errors.push({ field: "director", message: "This field is required" });
        //   }else if(director.length >= 255){
          //     errorsUser.push({ field: "director", message: "director need to be less 255 characters" });
          //   }
          //   if(year == null ){
            //       errors.push({ field: "year", message: "This field is required" });
            //   }else if(year.length >= 255){
              //     errorsUser.push({ field: "year", message: "year need to be less 255 characters" });
              //   }
              //   if(color == null ){
                //       errors.push({ field: "color", message: "This field is required" });
                //   }else if(color.length >= 255){
                  //     errorsUser.push({ field: "color", message: "color need to be less 255 characters" });
                  //   }
                  //   if(duration == null ){
                    //       errors.push({ field: "duration", message: "This field is required" });
                    //   }else if(duration.length >= 255){
//     errorsUser.push({ field: "duration", message: "duration need to be less 255 characters" });
//   }
//   if (errors.length) {
  //       res.status(422).json({ validationErrors: errors });
  //     } else {
    //       next();
    //     }
    // };
    // const validateUser = (req, res, next) => {
      //   const { firstname,lastname,email,city,language } = req.body;
      //   const errorsUser = [];
      
      //   if (firstname == null ) {
        //     errorsUser.push({ field: "firstname", message: "This field is required" });
        //   }else if(firstname.length >= 255){
          //     errorsUser.push({ field: "firstname", message: "Firstname need to be less 255 characters" });
          //   }
          //   if(lastname == null ){
            //     errorsUser.push({ field: "lastname", message: "This field is required" });
            //   }else if(lastname.length >= 255){
              //     errorsUser.push({ field: "lastname", message: "lastname need to be less 255 characters" });
              //   }
              //   if(email == null ){
                //     errorsUser.push({ field: "email", message: "This field is required" });
    //   }else if(firstname.length >= 255){
      //     errorsUser.push({ field: "email", message: "email need to be less 255 characters" });
      //   }
      //   if(city == null ){
        //     errorsUser.push({ field: "city", message: "This field is required" });
    //   }else if(city.length >= 255){
    //     errorsUser.push({ field: "city", message: "city need to be less 255 characters" });
    //   }
    //   if(language == null ){
      //     errorsUser.push({ field: "language", message: "This field is required" });
      //   }else if(language.length >= 255){
        //     errorsUser.push({ field: "language", message: "language need to be less 255 characters" });
        //   }
        //   if (errors.length) {
          //       res.status(422).json({ validationErrors: errorsUser });
          //     } else {
            //       next();
    //     }
    // };