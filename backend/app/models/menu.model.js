const sql = require("./db.js");

// constructor
const Menu = function(menu) {
  this.description = menu.description;
  this.name = menu.name;
  this.price = menu.price;
};

Menu.create = (newMenu, result) => {
  sql.query("INSERT INTO menu SET ?", newMenu, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created menu: ", { id: res.insertId, ...newMenu });
    result(null, { id: res.insertId, ...newMenu });
  });
};

Menu.findById = (menuId, result) => {
  sql.query(`SELECT * FROM menu WHERE id = ${menuId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found menu: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Menu with the id
    result({ kind: "not_found" }, null);
  });
};

Menu.getAll = result => {
  sql.query("SELECT * FROM menu", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("menu: ", res);
    result(null, res);
  });
};

Menu.updateById = (id, menu, result) => {
  sql.query(
    "UPDATE menu SET price = ? WHERE id = ?",
    [menu.price, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Menu with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated menu: ", { id: id, ...menu });
      result(null, { id: id, ...menu });
    }
  );
};

Menu.remove = (id, result) => {
  sql.query("DELETE FROM menu WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Menu with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted menu with id: ", id);
    result(null, res);
  });
};

Menu.removeAll = result => {
  sql.query("DELETE FROM menu", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} menu`);
    result(null, res);
  });
};

module.exports = Menu;