const library = require('../../Library/library');


module.exports ={

    adminLogin:(data,callback) => {

        var query = "";

        library.db.query(query, (err,response)=>{
            if(err){
                console.log(err);
                return callback(err);
            }else{
                return callback(null, response)
            }
        })

    }
}