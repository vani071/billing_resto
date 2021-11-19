module.exports = app => {
    const order = require("../controllers/order.controller.js");
  
    // Create a new Table
    app.post("/orders", order.create);
  
    // Retrieve all Tables
    app.get("/orders", order.findAll);
  
    // Retrieve a single order with orderId
    app.get("/orders/:orderId", order.findOne);
  
    // Update a order with orderId
    app.put("/orders/:orderId", order.update);
  
    // Delete a order with orderId
    app.delete("/orders/:orderId", order.delete);
  
    // Create a new order
    app.delete("/orders", order.deleteAll);
  };