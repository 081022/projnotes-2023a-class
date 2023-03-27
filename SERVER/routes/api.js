//Importing Exoress library
var express = require ('express');
//Creating a Router instace
var router = express.Router();

//Creating the route
router.get('/author', (req, res)=>{
res.json({});
});// function (req, res){}

//exporting the router
module.exports = router;
