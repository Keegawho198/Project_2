const db = require("../models");
const passport = require("../config/passport_config");


module.exports = function (app) {
    //define all routes handling function here

    app.post("/api/signup", checkNotAuthenticated, async function (req, res) {
        const { firstName, lastName, email, password, gender, country } = req.body;
        console.log(req.body);
        const result = await db.User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            gender: gender,
            country: country
        });
        res.redirect("/login");
    });

    app.post("/api/login", passport.authenticate(`local`, {
        successRedirect: `/index`,
        failureRedirect: `/`,
        failureFlash: true
    }), (req, res) => {
        res.json(req.user);
    });

    app.get("/api/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    function checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/index')
        }
        next()
    };
    app.get("/api/budget", function (req, res) {
        db.Budget.findAll({
            where: {
                UserId: req.user.id
              },
        }).then(function (results) {
            console.log(results);
            res.json(results);
        });

    });

    app.post("/api/newcat", function (req, res) {

        console.log("Budget Data:");
        console.log(req.body);

        db.Budget.create({
            category: req.body.category,
            amount: req.body.amount,
            UserId: req.user.id
        }).then(function (results) {
            res.end();
        });

    });
}