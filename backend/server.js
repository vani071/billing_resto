const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "server running well." });
});

require("./app/routes/customer.routes.js")(app);
require("./app/routes/table.routes.js")(app);
<<<<<<< HEAD
require("./app/routes/menu.routes.js")(app);
=======
require("./app/routes/order.routes.js")(app);
>>>>>>> 6bf56f23fc54db8e4fdb76b5981301fb2d84a399

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});