const mongoose = require("mongoose")

module.exports = () => {
    mongoose.connect("mongodb://localhost/movie-api", {
            useNewUrlParser: true
        })
        .then(() => console.log("MongoDB'ye bağlandık kanka"))
        .catch(() => console.log("Bağlanırken hata verdi ya"))
    mongoose.set("useCreateIndex",true)

    mongoose.Promise = global.Promise
}