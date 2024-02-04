const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(
  morgan(
    ":date[web] :remote-addr :req[header] :method :url :status :res[content-length] - :response-time ms",
    {
      skip: function (req, _res) {
        return req.url === "/";
      },
    },
  ),
);

app.disable("x-powered-by");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json({ msg: "server is up and running" });
});

app.use("/apis/v1", require("./routes"));

app.listen(process.env.PORT, async () => {
  await mongoose.connect(process.env.MONGO_URL ?? "");
  console.log("Server is listening on port: " + process.env.PORT);
});
