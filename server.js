const app = require("./index");
const dbConnect = require("./utils/db");
require("dotenv").config();

dbConnect();
const PORT = process.env.PORT;

app.listen(PORT);
