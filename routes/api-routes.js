const db = require("../models");
const passport = require("../config/passport_config");

module.exports = function (app) {
    //ll routes handling functions are defined here

    app.post("/api/signup", checkNotAuthenticated, async function (req, res) {
        const { firstName, lastName, email, password, gender, country } = req.body;
        const result = await db.User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            gender: gender,
            country: country
        });
        const budgetResult = await db.Budget.bulkCreate([
            { category: "income", amount: 0, cadence: 52, UserId: result.dataValues.id },
            { category: "homeUtil", amount: 0, cadence: 52, UserId: result.dataValues.id },
            { category: "groceries", amount: 0, cadence: 52, UserId: result.dataValues.id },
            { category: "transport", amount: 0, cadence: 52, UserId: result.dataValues.id },
            { category: "entEatout", amount: 0, cadence: 52, UserId: result.dataValues.id }
        ]);


        const budgetDetailResult = await db.BudgetDetails.bulkCreate([
            { name: "salary", amount: 0, cadence: 52, UserId: result.dataValues.id, BudgetId: budgetResult.find(ele => ele.category === "income").id },
            { name: "rental", amount: 0, cadence: 52, UserId: result.dataValues.id, BudgetId: budgetResult.find(ele => ele.category === "income").id },
            { name: "otherIncome", amount: 0, cadence: 52, UserId: result.dataValues.id, BudgetId: budgetResult.find(ele => ele.category === "income").id },
            { name: "gasElecWater", amount: 0, cadence: 52, UserId: result.dataValues.id, BudgetId: budgetResult.find(ele => ele.category === "homeUtil").id },
            { name: "mortgage", amount: 0, cadence: 52, UserId: result.dataValues.id, BudgetId: budgetResult.find(ele => ele.category === "homeUtil").id },
            { name: "phoneInt", amount: 0, cadence: 52, UserId: result.dataValues.id, BudgetId: budgetResult.find(ele => ele.category === "homeUtil").id },
            { name: "huOther", amount: 0, cadence: 52, UserId: result.dataValues.id, BudgetId: budgetResult.find(ele => ele.category === "homeUtil").id },
            { name: "food", amount: 0, cadence: 52, UserId: result.dataValues.id, BudgetId: budgetResult.find(ele => ele.category === "groceries").id },
            { name: "groceriesOther", amount: 0, cadence: 52, UserId: result.dataValues.id, BudgetId: budgetResult.find(ele => ele.category === "groceries").id },
            { name: "publicTrans", amount: 0, cadence: 52, UserId: result.dataValues.id, BudgetId: budgetResult.find(ele => ele.category === "transport").id },
            { name: "fuelParkings", amount: 0, cadence: 52, UserId: result.dataValues.id, BudgetId: budgetResult.find(ele => ele.category === "transport").id },
            { name: "eatout", amount: 0, cadence: 52, UserId: result.dataValues.id, BudgetId: budgetResult.find(ele => ele.category === "entEatout").id },
            { name: "ent", amount: 0, cadence: 52, UserId: result.dataValues.id, BudgetId: budgetResult.find(ele => ele.category === "entEatout").id },
        ]);

        res.redirect("/login");
    });

    app.put("/api/updateBudgetDetails", checkAuthenticated, async function (req, res) {
        const userId = req.user.id;
        for(let [name, fields] of Object.entries(req.body)){
            await db.BudgetDetails.update(
                {
                    amount:fields.amount,
                    cadence: fields.cadence,
                }, {
                where: {
                    name: name,
                    UserId: userId
                }
            });
        };
        res.status(200).end();
    })

    app.put("/api/updateBudget", checkAuthenticated, async function (req, res) {
        const userId = req.user.id;
        for(let [name, amount] of Object.entries(req.body)){
            await db.Budget.update(
                {
                    amount: amount
                }, {
                where: {
                    category: name,
                    UserId: userId
                }
            });
        };
        res.status(200).end();
    })

    app.get("/api/getBudget", checkAuthenticated, async function (req, res) {
        const userId = req.user.id;
        const result = await db.Budget.findAll({ where: { UserId: userId } });
        res.json(result);
    })

    app.get("/api/getBudgetDetails", checkAuthenticated, async function (req, res) {
        const userId = req.user.id;
        const result = await db.BudgetDetails.findAll({ where: { UserId: userId } });
        res.json(result);
    })


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


    app.get("/api/percentage/:userId", function (req, res) {
        db.Expense.findAll({
            include: [{
                model: db.Budget,
                where: { UserId: req.params.userId }
            }]
        }).then(function (result) {
            console.log(result);
            var totalSpend = 0;
            //var categories = [];
            let catTotal = {};
            let budgetTotal = {};
            for (let entry of result) {
                if (catTotal[entry.Budget.category]) catTotal[entry.Budget.category] += entry.amount;
                else catTotal[entry.Budget.category] = entry.amount;

                if (budgetTotal[entry.Budget.category]) budgetTotal[entry.Budget.category] += entry.Budget.amount;
                else budgetTotal[entry.Budget.category] = entry.Budget.amount;

                totalSpend += entry.amount;
            }
            console.log("budgetTotal");
            console.log(budgetTotal);

            var keys = Object.keys(catTotal);

            console.log("catTotal");
            console.log(catTotal);


            let spendPercent = {};
            for (let t of keys) {
                if (!spendPercent[t]) spendPercent[t] = (catTotal[t] / budgetTotal[t]) * 100 + "%";
            }
            console.log("spendPercentage:")
            console.log(spendPercent);
    
            res.json(spendPercent);
        })
    })



    function checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/index')
        }
        next()
    };

    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/login')
    }
}