const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json()); // add this line

const port = process.env.APP_PORT ?? 5000;
const { validateMovie,validateUser } = require("./validators.js");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const userHandlers = require("./userHandlers");
const movieHandlers = require("./movieHandlers");
const { hashPassword, verifyPassword,verifyToken} = require("./auth.js");

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users", hashPassword,validateUser, userHandlers.postUser);
app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

//Secure zone
app.use(verifyToken); // authentication wall : verifyToken is activated for each route after this line

app.put("/api/users/:id",validateUser, userHandlers.updateUser);
app.delete("/api/users/:id",userHandlers.deleteUser);

app.post("/api/movies",validateMovie, movieHandlers.postMovies);
app.put("/api/movies/:id",validateMovie, movieHandlers.updateMovies);
app.delete("/api/movies/:id",movieHandlers.deleteMovies);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
