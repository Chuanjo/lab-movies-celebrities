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
router.get("/:id/details", (req,res,next)=>{
    // const id = req.params.id  ==> es lo mismo que la linea siguiente
    const {id} = req.params
    MovieModel.findById(id)
    .populate("cast")
    .then((oneMovie)=>{
      res.render("movies/movie-details.hbs", {oneMovie})
    })
    .catch((err)=>{
      next(err)
    })
  })

router.post("/:id/delete", async (req,res,next)=>{
    try {
        const {id}=req.params

        await MovieModel.findByIdAndDelete(id)

        res.redirect("/movies")
    }
    catch(err){
        next(err)
    }
})

router.get("/:id/edit",(req,res,next)=>{

    const {id} = req.params
    MovieModel.findById(id)
    .then((oneMovieParam)=>{
      oneMovie = oneMovieParam;
      return CelebrityModel.find()
    })
    .then((allCelebrities)=>{
      res.render("movies/edit-movie.hbs", {oneMovie, allCelebrities})
    })
    .catch((err)=>{
        next(err)
    })
  })

router.post("/:id/edit",(req,res,next)=>{
    const { id } = req.params 
    const {title,genre,plot,cast} = req.body
    
    MovieModel.findByIdAndUpdate(id, {title,genre,plot,cast})
    .then((updatedMovie)=>{
        res.redirect(`/movies/${updatedMovie._id}/edit`)
    })
    .catch((err)=>{
        next(err)
    })
})





module.exports = router;