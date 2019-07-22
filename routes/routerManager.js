const movieRouter = require("./movie")
const registerRouter = require("./register")
const directorRouter = require("./director")
const verifyToken = require("../middleware/verify-token")

module.exports = app => {
    app.use("/api",verifyToken)
    app.use("/api/movies", movieRouter)
    app.use("/", registerRouter)
    app.use("/api/directors", directorRouter)
}