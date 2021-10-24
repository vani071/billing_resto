module.exports = app => {
    const menus = require("../controllers/menu.controller.js");
  
    // Create a new menu
    app.post("/menus", menus.create);
  
    // Retrieve all menus
    app.get("/menus", menus.findAll);
  
    // Retrieve a single menu with menuId
    app.get("/menus/:menuId", menus.findOne);
  
    // Update a menu with menuId
    app.put("/menus/:menuId", menus.update);
  
    // Delete a menu with menuId
    app.delete("/menus/:menuId", menus.delete);
  
    // Create a new menu
    app.delete("/menus", menus.deleteAll);
  };