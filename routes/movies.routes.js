const router = require("express").Router();
const MovieModel = require("../models/Movie.model")
const CelebrityModel = require("../models/Celebrity.model")

router.get("/create", (req, res, next) => {
    CelebrityModel.find()
    .then((allCelebrities)=>{
        console.log(allCelebrities)
        res.render("movies/new-movie.hbs", {allCelebrities});
    })
    .catch((err)=>{
        next(err)
    })
  });

router.post("/create",(req,res,next)=>{
    MovieModel.create(
        {    title: req.body.title,
            genre: req.body.genre,
            plot: req.body.plot,
            cast: req.body.cast
        })
    .then((response)=>{
        console.log(response)
        res.redirect("/")
    })
    .catch((err)=>{
        next(err)
    })
})
router.get("/", (req,res,next)=>{
    MovieModel.find()
    .then((allMovies)=>{
        res.render("movies/movies.hbs", {allMovies})
    })
    .catch((err)=>{
        next(err)
    })
})





module.exports = router;