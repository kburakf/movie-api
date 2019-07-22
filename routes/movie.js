const express = require('express');
const router = express.Router();

const Movie = require("../models/Movie")

/* GET users listing. */

router.get("/", (req, res) => {
  const promise = Movie.aggregate([
    {
      $lookup:{
        from:"directors",
        localField:"director_id",
        foreignField:"_id",
        as:"director"
      }
    },{
      $unwind:"$director"
    },
  ])
  promise
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

router.get("/top10", (req, res, next) => {
  const promise = Movie.find({}).limit(10).sort({
    imdb_score: -1
  })

  promise
    .then(data => res.json(data))
    .catch(() => next({
      message: "Filmi bulamadık kanka"
    }))
})

router.get("/:movie_id", (req, res, next) => {
  const promise = Movie.findById(req.params.movie_id)

  promise
    .then(movie => res.json(movie))
    .catch(() => next({
      message: "Filmi bulamadık kanka"
    }))
})
router.post('/', (req, res, next) => {

  /*const {
    title,
    imdb_score,
    category,
    country,
    year
  } = req.body */

  const movie = new Movie(req.body)

  /*const movie = new Movie({ 1.Şekil
    title: title,
    imdb_score: imdb_score,
    category: category,
    country: country,
    year: year
  })*/

  /*movie.save((err, data) => { 2.Şekil
    if (err)
      res.json(err)
    res.json(data)
  })*/

  const promise = movie.save() // 3.Şekil
  promise
    .then(data => res.json({
      status: 1
    }))
    .catch(err => res.json(err))
});

router.put("/:movie_id", (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {
    new: true
  })

  promise
    .then(movie => res.json(movie))
    .catch(() => next({
      message: "Filmi bulamadık kanka"
    }))
})

router.delete("/:movie_id", (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id)

  promise
    .then(movie => res.json(movie))
    .catch(() => next({
      message: "Filmi bulamadık kanka"
    }))
})

// Between

router.get("/between/:start_year/:end_year", (req, res) => {
  const {
    start_year,
    end_year
  } = req.params
  const promise = Movie.find({
    year: {
      "$gte": parseInt(start_year),
      "$lte": parseInt(end_year)
    }
  }).sort({year:1})
  promise
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

module.exports = router;