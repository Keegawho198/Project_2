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

  app.get("/budget", function (req, res) {
    console.log({req: req.user});
    res.render("budget", {req: req.user});
  })

}