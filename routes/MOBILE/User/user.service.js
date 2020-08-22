const library = require('../../Library/library');

module.exports = {

  create:async (data, callback) => {
    // console.log("data",data);
    const salt =await library.bcrypt.genSalt(10);
    // console.log(typeof data.password)
    const userPassword = data.password
    const hashPassword =await library.bcrypt.hashSync(userPassword,salt);

    var query =
      "INSERT INTO `mas_user`( `user_name`, `user_surname`, `user_email`,`user_password`) VALUES ('"+data.userName+"','"+data.surName+"','"+data.email+"','"+hashPassword+"');";
      library.db.query(
      query,
      (err, response) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, response);
        }
      }
    );
  },

  getUserData:async (data, callback)=>{
    // console.log("comming")
    var query = "SELECT user_name,user_password FROM mas_user WHERE user_email = '"+data.email+"';";
    console.log(query);
    library.db.query(query,async (err,response)=>{
      if(err){
        callback(err);
      }else{
        // console.log(response);
        // response.forEach(async (item, i) => {

        //   response[i].usertype =await findingType(response[0].usertype_id);

        //   if(i == response.length - 1){
console.log(response)
            callback(null,response);
        //   }
        // })
      }
    })
  },
 userAuthentication: (data, db,jwt, callback) => {
    console.log(data);
    var query =
      "SELECT * FROM `mas_user` WHERE email = ?";
    db.query(
      query,
      [data.mailId],
      (err, response) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, response);
        }
      }
    );
  },

};


findingType = (data)=>{
  return new Promise((resolve,reject)=>{

    console.log("comming")
    var query = "SELECT * FROM `mas_user_type` WHERE id = '"+data+"';";
    // console.log(query);
    db.query(query,(err,response)=>{
      if(err){
        resolve(err);
      }else{
        console.log(response)
        resolve(response);
      }
    })
  })

}