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


    app.get("/api/overspend", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    function checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/index')
        }
        next()
    };
}