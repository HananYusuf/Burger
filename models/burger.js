var orm = require("../config/orm.js");

//Also inside `burger.js`, create the code that will call the ORM functions using burger specific input for the ORM.
var burger ={

selectAll: function(cb){
orm.selectAll("burgers", function(res){ //defining a function to do smt later on with the res
    cb(res);
        });

},


insertOne: function(cols, vals, cb){
    orm.insertOne("burgers", cols, vals, function(res){
        cb(res);
    });
},
//UPDATE "burgers" SET {devoured: true} WHERE "id = 2"
//
updateOne: function(id,cb){
    orm.updateOne("burgers","devoured", id, function(res){
        cb(res);
    });
    }

};

module.exports = burger;