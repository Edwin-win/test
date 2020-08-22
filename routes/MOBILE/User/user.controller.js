const { create, getUserData } = require("./user.service");
const library = require("../../Library/library");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    console.log(body);
    create(body, (err, response) => {
      if (err) {
        console.log(err);
        return res.send(library.errorData.errorCodeResponse(err.errno));
      } else {
        return res.send({
          status: 1,
          msg: "Success",
          data: [],
        });
      }
    });
  },

  loginUser: (req, res) => {
    const body = req.body;
    console.log(body);
    getUserData(body, async (err, response) => {
      if (err) {
        console.log(err);
        return res.send(library.errorData.errorCodeResponse(err.errno));
      } else {
        const hashPassword = await library.bcrypt.compareSync(
          body.password,
          response[0].user_password
        );
        console.log(hashPassword);
        if (hashPassword) {
          return res.send({
            status: 1,
            msg: "Success",
            data: response,
          });
        } else {
          return res.send({
            status: 0,
            msg: "Username or Password Invalid",
            data: [],
          });
        }
      }
    });
  },
};
