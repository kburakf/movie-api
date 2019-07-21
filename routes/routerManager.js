const movieRouter = require("./movie")
const indexRouter = require("./index")

module.exports = app => {
    app.use("/api/movie", movieRouter)
    app.use("/index", indexRouter)
}