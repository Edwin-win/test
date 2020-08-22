const library = require('../../Library/library');
const { createUser,loginUser } = require('./user.controller');
    
    library.router.post('/createUser',createUser);
    library.router.post('/login',loginUser);

    // library.router.post('/getUserData',user.userData);
    // library.router.post('/login',user.loginAuthentication);


module.exports =  library.router
