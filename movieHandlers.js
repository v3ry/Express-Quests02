const database = require("./database");

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
console.log(id);
  database
    .query(`select * from movies where id = ${id}`)
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
}
const postMovies = (req, res) => {
  const { title, director, year, color, duration } = req.body;
  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`api/movies/${result.insertId}`).sendStatus(201)
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};

const updateMovies = (req, res) => {
  const id = parseInt(req.params.id)
  const { title, director, year, color, duration } = req.body;
  database
    .query(
      "UPDATE movies SET title = ?,director = ?, year = ?, color = ?, duration = ? WHERE id = ?",
      [title, director, year, color, duration,id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the movie");
    });
};

const deleteMovies = (req, res) => {
  const id = parseInt(req.params.id)
  // const { title, director, year, color, duration } = req.body;
  database
    .query(
      "DELETE FROM movies WHERE id = ?",[id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the movie");
    });
};

module.exports = {
  getMovies,
  getMovieById,
  postMovies,
  updateMovies,
  deleteMovies,
};
