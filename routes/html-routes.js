module.exports = function (app) {
  //define all routes handling function here

  app.get("/", checkNotAuthenticated, function (req, res) {
    res.render("login");
  })

  app.get("/signup", function (req, res) {
    res.render("signup");
  })

  app.get("/login", checkNotAuthenticated, function (req, res) {
    res.render("login");
  })

  app.get("/index", checkAuthenticated, function (req, res) {
    const userName = `${req.user.firstName} ${req.user.lastName}`;
    res.render("index", { name: userName});
  })

  app.get("/budget", checkAuthenticated, function (req, res) {
    const userName = `${req.user.firstName} ${req.user.lastName}`;
    res.render("budget", { name: userName});
  })

  app.get("/expenses", checkAuthenticated, function (req, res) {
    const userName = `${req.user.firstName} ${req.user.lastName}`;
    res.render("expense", { name: userName});
  })

  app.get("/insights",checkAuthenticated, function (req, res) {
    const userName = `${req.user.firstName} ${req.user.lastName}`;
    const userId = req.user.id;
    console.log(userId);

    res.render("insights",{ name: userName});
  })

  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
  }

  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/index')
    }
    next()
  }
}