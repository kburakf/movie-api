const movieRouter = require("./movie")
const indexRouter = require("./index")

module.exports = app => {
    app.use("/api/movies", movieRouter)
    app.use("/index", indexRouter)
}