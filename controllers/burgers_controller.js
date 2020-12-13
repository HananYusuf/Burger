var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        console.log(data);

        var hbsObject = { //once we have the object hbsobject then we give it to handlebar using render to bring it to the front end
            burger: data
        };

        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

    router.post("/api/newburger", function(req, res) {
        burger.insertOne(["burger_name"], [req.body.burger_name], function(data){
            
            res.redirect("/");
           // console.log(res);
        })
    });

    //UPDATE burgers SET devoured = true WHERE id = 2;
    //UPDATE "burgers" SET {devoured: true} WHERE "id = 2"

    router.put("/api/updateburger/:id", function(req, res){
        let id = req.params.id;

        burger.updateOne(id, function(data) {
            if(data.changedRows == 0){
                return res.status(404).end()
            }else {
                res.status(200).end();
            }
        }) 
    });

module.exports = router;