const library = require('../../Library/library');
const { login } = require('./adminBasicDetails.controller');

library.router.post('/adminLogin',login);


module.exports = library.router;