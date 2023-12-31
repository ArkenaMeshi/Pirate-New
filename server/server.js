const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');


app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());   
app.use(express.urlencoded({ extended: true }));
require("./config/mongoose.config");
require("./routes/pirate.routes")(app);
require('dotenv').config();

app.listen(8000, () => {
  console.log("Listening at Port 8000");
});