function log(req, res, next) {
    console.log("hello");
    next();
}

module.exports = log;
