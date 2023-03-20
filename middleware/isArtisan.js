module.exports = (req, res, next) => req.payload.role === "Artisan" ? next() : res.redirect("/post");
