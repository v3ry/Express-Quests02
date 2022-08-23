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

module.exports = {
  getUsers,
  getUserById,
};
