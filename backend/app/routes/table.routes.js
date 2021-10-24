module.exports = app => {
    const table = require("../controllers/table.controller.js");
  
    // Create a new Table
    app.post("/tables", table.create);
  
    // Retrieve all Tables
    app.get("/tables", table.findAll);
  
    // Retrieve a single table with tableId
    app.get("/tables/:tableId", table.findOne);
  
    // Update a table with tableId
    app.put("/tables/:tableId", table.update);
  
    // Delete a table with tableId
    app.delete("/tables/:tableId", table.delete);
  
    // Create a new table
    app.delete("/tables", table.deleteAll);
  };