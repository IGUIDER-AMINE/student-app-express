import dotenv from "dotenv"; // Appeler le module dotenv pour charger les variables d'environnement depuis le fichier .env
dotenv.config();

import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
// Allow requests from all origins
// app.use(cors());
app.use(express.json()); // parse data to json format

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "crud",
// });

// Allow requests only from specific origins
// const corsOptions = {
//   origin: [process.env.ORIGIN],
// };

app.use(cors({ origin: ["https://student-app-y.vercel.app/"] }));

// app.use(cors(corsOptions));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

console.log(process.env.DB_HOST);

app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    res.json(result);
  });
});

app.post("/student", (req, res) => {
  const sql = "INSERT INTO student (Name,Email) VALUES(?)";
  const values = [req.body.name, req.body.email];

  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Message: err });
    return res.json(result);
  });
});

app.get("/read/:id", (req, res) => {
  const sql = "SELECT * FROM student WHERE ID = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: err });
    return res.json(result);
  });
});

app.put("/update/:id", (req, res) => {
  const sql = "UPDATE student SET Name=?,Email=? WHERE ID = ?";
  const id = req.params.id;
  db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
    if (err) return res.json({ Message: err });
    return res.json(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE ID = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: err });
    return res.json(result);
  });
});

app.listen(8081, () => {
  console.log("Server running on port 8081");
});
