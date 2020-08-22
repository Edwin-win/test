module.exports = {
    express: require('express'),
    errorData: require('../ERROR/errorcode'),
    router: require('express').Router(),
    db: require('../DATABASE/db'),
    bcrypt: require('bcrypt'),
}