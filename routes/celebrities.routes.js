const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model")

router.get("/create", (req, res, next) => {
    console.log("ok")
    res.render("celebrities/new-celebrity.hbs");
  });

router.post("/create",(req,res,next)=>{
    CelebrityModel.create(
        {    name: req.body.name,
            occupation: req.body.occupation,
            catchPhrase: req.body.catchPhrase,
        })
    .then((response)=>{
        console.log(response)
        res.redirect("/celebrities")
    })
    .catch((err)=>{
        next(err)
    })
    
})










module.exports = router;