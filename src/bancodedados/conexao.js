const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "123",
  database: "todolist",
});

const query = (text, param) => {
  return pool.query(text, param);
};

module.exports = {
  query,
};
