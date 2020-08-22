const { adminLogin } = require('./adminBasicDetails.service');
const library = require('../../Library/library');


module.exports = {
    login:(req,res) => {
        const body = req.body;
        adminLogin(body,(err,response)=>{
            if(err){
                console.log(err);
                res.send(library.errorData.errorCodeResponse(err.errno))
            }else{
                if(response.legthe > 0){
                    return res.send({
                        status: 1,
                        msg: "Success",
                        data: response,
                      });
                }else{
                    return res.send({
                        status: 1,
                        msg: "Please Enter the Valid Credentials",
                        data: [],
                      });
                }
            }
        })
    }
}