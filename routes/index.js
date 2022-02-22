const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});



const celebrityRoutes = require("./celebrities.routes")
router.use("/celebrities", celebrityRoutes)

// const authorRoutes = require("./author.routes")
// router.use("/authors", authorRoutes)


module.exports = router;
