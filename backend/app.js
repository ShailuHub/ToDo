const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const taskRoute = require("./routes/task");
const sequelize = require("./utils/database");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(taskRoute);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is working on the port 3000");
    });
  })
  .catch((err) => console.log(err));
