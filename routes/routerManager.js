const movieRouter = require("./movie")
const indexRouter = require("./index")
const directorRouter = require("./director")

module.exports = app => {
    app.use("/api/movies", movieRouter)
    app.use("/index", indexRouter)
    app.use("/api/directors", directorRouter)
}