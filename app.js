require('dotenv').config();
var express = require("express");
var app = express();
const router = express.Router();
var http = require("http").Server(app);
const fileUpload = require('express-fileupload');
var dbfunctions=require('./routes/DATABASE/db')
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var Mustache = require("mustache");
var fs = require("fs");
var ses = require("nodemailer-ses-transport");
var async = require("async");
var dateFormat = require("dateformat");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const library  = require("./routes/Library/library")
// console.log(library.errorData)

// api files
// async function testing(){

//   var myPlaintextPassword = "edwin";
//   const salt =await bcrypt.genSalt();
//   console.log(salt);
//   const hash =await bcrypt.hashSync(myPlaintextPassword, salt);
//   console.log(hash);
  
//   console.log(bcrypt.compareSync(myPlaintextPassword, hash));
// }
// // header access control
// testing();



// app.set('view engine', 'pug');
// app.set('views','views');
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(fileUpload());

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());


const userRouter = require('./routes/MOBILE/User/user.router')


app.use("/api/user",userRouter);


//Testing

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.MAP_API_KEY
});

// "origins:"13.089136|80.209564",
//   destinations:"13.072090,80.201860|13.072090,80.201860""


app.get('/',(req,res) => {

  var query = "SELECT * FROM `trn_venue_details` WHERE trn_venue_location != '' AND trn_venue_location IS NOT NULL LIMIT 10";

  library.db.query(query,async (err,response)=>{
    if(err){
      console.log(err);
    }else{
      console.log(response)
      response.forEach(async (item,i) => {
        
        var distance = await distanceCalculation(response[i]);
        

            response[i].distance = distance
        
        if(i == response.length - 1){

          res.send(response);
        }

      })
    }
  })

  // var jsonlist =[{origins:"13.089136,80.209564|8.088306,77.538452",destinations:"13.089136,80.209564|8.088306,77.538452"},{origins:"13.089136,80.209564|12.956010,80.143532",destinations:"13.089136,80.209564|12.956010,80.143532"},]

  // var origin = "13.089136,80.209564|8.088306,77.538452";
  // var destinations = "13.089136,80.209564|8.088306,77.538452";

// jsonlist.forEach(async (item,i)=>{
  
//   googleMapsClient.distanceMatrix({
//     // address: ' Block E, Annanagar East, Chennai, Tamil Nadu'
//     origins:jsonlist[i].origins,
//     destinations:jsonlist[i].destinations,
//     mode:"driving"
//   }, function(err, response) {
//     if (!err) {
//       console.log(response.json.rows);
//       res.send(response.json.rows[0].elements)
//     }
//   }); 
//   })

})

distanceCalculation=(responseData)=> {
  console.log("comming")
  return new Promise((resolve, reject) => {

    // var jsonlist =[{origins:"13.089136,80.209564|"+responseData.trn_venue_location+"",destinations:""+responseData.trn_venue_location+""}]
    
     googleMapsClient.distanceMatrix({
      // address: ' Block E, Annanagar East, Chennai, Tamil Nadu'
      origins:"13.089136,80.209564|"+responseData.trn_venue_location+"",
      destinations:"13.089136,80.209564|"+responseData.trn_venue_location+"",
      mode:"driving"
    }, function(err, result) {
      if (!err) {
        console.log(result.json.rows);
        resolve(result.json.rows[1].elements[0])
      }else{
        resolve(err)
      }
    });

  })
}




// console.log(googleMapsClient.distanceMatrix)

// runing on port
app.set("port", process.env.APP_PORT);
app.set("host", process.env.APP_HOST);
http.listen(app.get('port'), '0.0.0.0', function () {
  console.log(
    "Express server listening on port " +
    app.get("host") +
    ":" +
    app.get("port")
  );
});

