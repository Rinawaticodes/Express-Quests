const database = require("./database");

const getUsers = (req, res) => {
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

  database
    .query("select * from users where id = ?", [id])
    .then(([user]) => {
      if (user.length > 0) {
        res.status(200).json(user);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });

  // const user = users.find((user) => user.id === id);

  // if (user != null) {
  //   res.json(user);
  // } else {
  //   res.status(404).send("Not Found");
  // }
};
const postUsers = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users (firstname, lastname, email, city, language) VALUES (?,?,?,?,?)",
      [firstname, lastname, email, city, language]
    )
    .then(([user]) => {
      res.location(`/api/users/${user.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUsers,
};
