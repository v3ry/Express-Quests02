const database = require("./database");


const getUsers = (req,res)=>{
  database
  .query("select * from users")
  .then(([users]) => {
    res.json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
console.log(id);
  database
    .query(`select * from users where id = ${id}`)
    .then(([user]) => {
      user.length != 0 ? res.json(user):res.json("Not Found")
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json("Error retrieving data from database");
    });
}

const postUser = (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email, city, language } = req.body;
  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`api/users/${result.insertId}`).sendStatus(201)
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
};
