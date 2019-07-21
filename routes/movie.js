const express = require('express');
const router = express.Router();

const Movie = require("../models/Movie")

/* GET users listing. */
router.post('/', (req, res, next) => {

  const {
    title,
    imdb_score,
    category,
    country,
    year
  } = req.body

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
    .then(data => res.json({status: 1}))
    .catch(err => res.json(err))
});

module.exports = router;